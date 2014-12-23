using HtmlAgilityPack;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace ParseContent
{
    class Program
    {
        static void Main(string[] args)
        {
            PrepareRegionFile();
        }

        static void PrepareRegionFile()
        {            
            Hashtable area = new Hashtable();
            Hashtable statehoodNotes = GetStatehoodNotes();
            foreach (string state in States)
            {
                string[] splits = state.Split(':');
                string id = splits[0];
                string filename = string.Format("../../Data/{0}.xml", splits[1]);
                dynamic region = new ExpandoObject();
                if (statehoodNotes.Contains(splits[1]))
                {
                    region.StatehoodNotes = statehoodNotes[splits[1]];
                }

                area.Add(id, region);
                RetrieveContent(filename, region);
            }

            using (StreamWriter sw = new StreamWriter("../../Data/usadata.json"))
            {
                sw.Write(JsonConvert.SerializeObject(area));
            }
        }

        static Hashtable GetStatehoodNotes()
        {
            Hashtable statehood = new Hashtable();
            HtmlDocument doc = new HtmlDocument();
            doc.Load("../../Data/statehood.htm");

            var nodes = doc.DocumentNode.SelectNodes("//table[@id='statehoodDates']/tr");
            foreach (var node in nodes)
            {
                if (node.SelectNodes("td") == null)
                    continue;
                string stateName = node.SelectNodes("td[1]")[0].InnerText;
                stateName = stateName.ToLower().Replace(" ", string.Empty);
                string stateNote = node.SelectNodes("td[3]")[0].InnerText.Trim();
                if (stateNote.Length > 1)
                {
                    statehood.Add(stateName, stateNote);
                }
            }

            return statehood;
        }

        static private void RetrieveContent(string fileName, dynamic region)
        {
            Hashtable attributes = new Hashtable();
            region.Attributes = attributes;

            HtmlDocument doc = new HtmlDocument();
            doc.Load(fileName);

            string title = doc.DocumentNode.SelectNodes("/html/head/title")[0].InnerText;
            region.Name = title.Split('-')[0].Trim();

            var nodes = doc.DocumentNode.SelectNodes("/html/body/div/table/tr[2]/td[2]/table[2]/tr/td");
            foreach (var node in nodes)
            {
                string innerText = node.InnerText;
                string[] splits = innerText.Split(':');
                string nodeName = splits[0].Trim();
                string nodeValue = splits[1].Trim();
                if ("Entered the Union".CompareTo(nodeName) == 0)
                {
                    region.Statehood = nodeValue;
                    continue;
                }
                if ("Capital".CompareTo(nodeName) == 0)
                {
                    region.Capital = nodeValue;
                    continue;
                }
                if ("Origin of Name".CompareTo(nodeName) == 0)
                {
                    region.Origin = nodeValue;
                    continue;
                }
                if ("State Motto".CompareTo(nodeName) == 0)
                {
                    region.Motto = nodeValue;
                    continue;
                }
                if ("State Nicknames".CompareTo(nodeName) == 0)
                {
                    region.Nicknames = ToArrayString(nodeValue);
                    continue;
                }
                if ("State Nickname".CompareTo(nodeName) == 0)
                {
                    region.Nicknames = ToArrayString(nodeValue);
                    continue;
                }
                if ("Famous for".CompareTo(nodeName) == 0)
                {
                    region.Famous = nodeValue;
                    continue;
                }
                if ("Famous For".CompareTo(nodeName) == 0)
                {
                    region.Famous = nodeValue;
                    continue;
                }
                if (nodeName.StartsWith("Famous ") || nodeName.CompareTo("Animals and Birds") == 0 || nodeName.CompareTo("Native Animals and Birds") == 0 || nodeName.CompareTo("National Forests") == 0)
                {
                    continue;
                }
                if ("State Songs".CompareTo(nodeName) == 0)
                {
                    attributes.Add(nodeName, ToArrayString(nodeValue));
                    continue;
                }

                attributes.Add(nodeName, nodeValue);
            }

            nodes = doc.DocumentNode.SelectNodes("/html/body/div/table/tr[2]/td[2]/table[3]/tr/td[@bgcolor='#FFFFFF']");

            ArrayList facts = new ArrayList();
            region.Facts = facts;
            foreach (var node in nodes)
            {
                facts.Add(node.InnerText.Trim());
            }           
        }

        private static void FetchContent()
        {
            foreach (string state in States)
            {
                string[] splits = state.Split(':');
                string sourceUrl = string.Format("http://awesomeamerica.com/{0}", splits[1]);
                string destFile = string.Format("{0}.xml", state);
                FetchAndSaveFile(sourceUrl, destFile);
            }
        }

        private static ArrayList ToArrayString(string input)
        {
            ArrayList arr = new ArrayList();
            input.Replace("&bull;", "•");
            string[] splits = input.Split('•');
            foreach(string split in splits)
            {
                string value = split.Trim();
                if (value.Length > 0)
                {
                    arr.Add(value);
                }
            }
            return arr;
        }

        private static void FetchAndSaveFile(string url, string filePath)
        {
            Console.WriteLine("Fetching file {0}", url);
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                using (StreamWriter sw = new StreamWriter(filePath))
                {
                    using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                    {
                        sw.Write(sr.ReadToEnd());
                    }

                    Console.WriteLine("Saved Content: " + filePath);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed: " + url);
            }

            Thread.Sleep(2000);
        }

        private static string[] States = {
                                 "AL:alabama",
                                 "AK:alaska",
                                 "AZ:arizona",
                                 "AR:arkansas",
                                 "CA:california",
                                 "CO:colorado",
                                 "CT:connecticut",
                                 "DE:delaware",
                                 "FL:florida",
                                 "GA:georgia",
                                 "HI:hawaii",
                                 "ID:idaho",
                                 "IL:illinois",
                                 "IN:indiana",
                                 "IA:iowa",
                                 "KS:kansas",
                                 "KY:kentucky",
                                 "LA:louisiana",
                                 "ME:maine",
                                 "MD:maryland",
                                 "MA:massachusetts",
                                 "MI:michigan",
                                 "MN:minnesota",
                                 "MS:mississippi",
                                 "MO:missouri",
                                 "MT:montana",
                                 "NE:nebraska",
                                 "NV:nevada",
                                 "NH:newhampshire",                                 
                                 "NJ:newjersey",
                                 "NM:newmexico",
                                 "NY:newyork",
                                 "NC:northcarolina",
                                 "ND:northdakota",
                                 "OH:ohio",
                                 "OK:oklahoma",
                                 "OR:oregon",
                                 "PA:pennsylvania",
                                 "RI:rhodeisland",
                                 "SC:southcarolina",
                                 "SD:southdakota",
                                 "TN:tennessee",
                                 "TX:texas",
                                 "UT:utah",
                                 "VT:vermont",
                                 "VA:virginia",
                                 "WA:washington",
                                 "WV:westvirginia",
                                 "WI:wisconsin",
                                 "WY:wyoming"
                              };
    }
}
