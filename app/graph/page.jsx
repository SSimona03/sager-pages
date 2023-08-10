"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function Graph() {
    const [csvData, setCsvData] = useState([]);


    // ------------- get the file data from CSV-------------
    async function getData() {
        try {
            const response = await fetch("/sbs29_grch37.csv");
            const data = await response.text();

            const table = data.split("\n").slice(1);


            const dataSplit = table.map((row) => {
                const cols = row.split("\t");
                // const A = cols[0];
                // const B = cols[1];
                //return (A , B)
                return cols
            });

            setCsvData(dataSplit);

        } catch (error) {
            console.error("Error fetching CSV data:", error);
        }
        // console.log(table[1].split("\t")[0]);
    }
    //console.log(csvData[0][0])


    // ------------- arrange the data   rules applied to each row col 1 of table: 
    //C>A': 1, 'C>G': 2, 'C>T': 3, 'T>A': 4, 'T>C': 5, 'T>G': 6 -> position in data table
    //first letter of data
    //last letter of data 


    const sortDatabyX = () => {

        const sortOrder = {
            'C>A': 1,
            'C>G': 2,
            'C>T': 3,
            'T>A': 4,
            'T>C': 5,
            'T>G': 6,

        };

        const data = csvData.sort((a, b) => {
            const patternA = a[0].slice(2, 5);
            const patternB = b[0].slice(2, 5);

            if (patternA !== patternB) {
                return sortOrder[patternA] - sortOrder[patternB];
            } else if (a[0][0] !== b[0][0]) {
                return a[0][0].localeCompare(b[0][0]); // Compare first letters lexicographically
            } else if (a[0][6] !== b[0][6]) {
                return a[0][6].localeCompare(b[0][6]); // Compare characters at index 6 lexicographically
            } else {
                return a[1] - b[1]; // Sort by the second value if patterns, first letters, and characters at index 6 are the same
            }
        });

        return data;
    }



    // ------------- process data for X LINE -------------
    const dataX = sortDatabyX();
    const labels = dataX.map(x => {
        const xLine = [x][0][0];

        if (xLine.slice(2, 5) == 'C>A' || xLine.slice(2, 5) == 'C>G' || xLine.slice(2, 5) == 'C>T') { return xLine.replace(/\[.*?\]/, ' C ') }
        else if (xLine.slice(2, 5) == 'T>A' || xLine.slice(2, 5) == 'T>C' || xLine.slice(2, 5) == 'T>G') { return xLine.replace(/\[.*?\]/, ' T ') }
        else {
            return xLine;
        }

    }
    )
    // ------------- process data for Y LINE -------------
    const YLine = dataX.map(x => {
        const YLine = [x][0][1];
        return (YLine)
    }
    )



    // -------------  colors for each segment -------------

    const XColor = {
        CA: "#66a3ff", //blue
        CG: "#272626", //black
        CT: "#ff6666", //red
        TA: "#928787", //gray,
        TC: "#00b33c", //green,
        TG: "#ff99c2", //pink,
    }


    // -------------  data and options for table -------------
    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: YLine,
                backgroundColor: dataX.map(x => {
                    const colors = [x][0][0];

                    if (colors.slice(2, 5) == 'C>A') { return XColor.CA }
                    else if (colors.slice(2, 5) == 'C>G') { return XColor.CG }
                    else if (colors.slice(2, 5) == 'C>T') { return XColor.CT }
                    else if (colors.slice(2, 5) == 'T>A') { return XColor.TA }
                    else if (colors.slice(2, 5) == 'T>C') { return XColor.TC }
                    else if (colors.slice(2, 5) == 'T>G') { return XColor.TG }
                    else { return "rgb(0, 0, 0)" }

                }
                )

            }

        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false, //remove legend
                position: "top",
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20
                    }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                    padding: 10,
                    autoSkip: false,
                    fontSize: 10,
                    color: dataX.map(x => {
                        const colors = [x][0][0];

                        if (colors.slice(2, 5) == 'C>A') { return XColor.CA }
                        else if (colors.slice(2, 5) == 'C>G') { return XColor.CG }
                        else if (colors.slice(2, 5) == 'C>T') { return XColor.CT }
                        else if (colors.slice(2, 5) == 'T>A') { return XColor.TA }
                        else if (colors.slice(2, 5) == 'T>C') { return XColor.TC }
                        else if (colors.slice(2, 5) == 'T>G') { return XColor.TG }
                        else { return "rgb(0, 0, 0)" }

                    }
                    )
                },

            },

            y: {
                ticks: {

                    callback: function (value) {
                        return (value / 0.0971863943910265 * 10).toFixed(1) + '%'; // convert it to percentage
                    },
                },
                scaleLabel: {

                    display: true,
                    labelString: "Percentage",
                }
            }
        },
    };



    useEffect(() => {
        getData();

    }, []);


    return (

        <div className=" ">
            <div className="">

                <div className="font-bold text-xl px-10 mt-8"> <Link href='/' className="pr-2 text-3xl "> &larr; </Link>Bar Chart</div>
            </div>
            <div className="max-w-full  mx-5 mt-8 mb-20">
                <div className=" mx-auto  w-full cursor-pointer xl:w-4/5">
                    <div className="text-center pb-5">Tabel data SBS29</div>
                    <canvas id="chart" className="mt-0 h-10"></canvas>
                    {/******************* labels *******************/}
                    <div className="pb-5 px-12 w-full  flex flex-row justify-between">
                        <div className={`table-label border-b-8 text-lg border-[#66a3ff]`}> C &gt; A </div>
                        <div className={`table-label border-b-8 text-lg border-[#272626]`}> C &gt; G </div>
                        <div className={`table-label border-b-8 text-lg border-[#ff6666]`}> C &gt; T </div>
                        <div className={`table-label border-b-8 text-lg border-[#928787]`}> T &gt; A </div>
                        <div className={`table-label border-b-8 text-lg border-[#00b33c]`}> T &gt; C </div>
                        <div className={`table-label border-b-8 text-lg border-[#ff99c2]`}> T &gt; G </div>
                    </div>
                    {/******************* table display bars *******************/}
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div >

    );
}

export default Graph;
