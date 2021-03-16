let allData;
let colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
    years = ["2010", "2011", "2012", "2013", "2014"];
let countries_names = ['China', 'Bhutan', 'Timor-Leste', 'Taiwan China', 'Macao SAR China', 'Hong Kong SAR China', 'Central African Republic', 'Denmark', 'Ukraine', 'Uzbekistan', 'Uganda', 'Uruguay', 'Chad', 'Yemen Rep.', 'Armenia', 'Israel', 'Iraq', 'Iran Islamic Rep.', 'Belize', 'Cabo Verde', 'Russian Federation', 'Bulgaria', 'Croatia', 'Guam', 'Gambia The', 'Iceland', 'Guinea', 'Guinea-Bissau', 'Liechtenstein', 'Congo Rep.', 'Congo Dem. Rep.', 'Libya', 'Liberia', 'Canada', 'Ghana', 'Gabon', 'Hungary', 'Northern Mariana Islands', 'South Sudan', 'South Africa', 'Botswana', 'Qatar', 'Rwanda', 'Luxembourg', 'India', 'Indonesia', 'Guatemala', 'Ecuador', 'Eritrea', 'Cuba', 'Kyrgyz Republic', 'Djibouti', 'Kazakhstan', 'Colombia', 'Costa Rica', 'Cameroon', 'Tuvalu', 'Turkmenistan', 'Turkey', 'St. Lucia', 'St. Kitts and Nevis', 'Sao Tome and Principe', 'St. Vincent and the Grenadines', 'St. Martin (French part)', 'Sint Maarten (Dutch part)', 'San Marino', 'Guyana', 'Tanzania', 'Ethiopia', 'Kiribati', 'Tajikistan', 'Senegal', 'Serbia', 'Sierra Leone', 'Cyprus', 'Seychelles', 'Mexico', 'Togo', 'Dominica', 'Dominican Republic', 'Korea Rep.', 'Austria', 'Venezuela RB', 'Bangladesh', 'Angola', 'Antigua and Barbuda', 'Andorra', 'Micronesia Fed. Sts.', 'Nicaragua', 'Nigeria', 'Niger', 'Nepal', 'Bahamas The', 'Pakistan', 'Barbados', 'Papua New Guinea', 'Paraguay', 'Panama', 'Bahrain', 'Brazil', 'Burkina Faso', 'Burundi', 'Greece', 'Palau', 'Curacao', 'Cayman Islands', 'Germany', 'Italy', 'Solomon Islands', 'Latvia', 'Norway', 'Czech Republic', 'Moldova', 'Morocco', 'Monaco', 'Brunei Darussalam', 'Fiji', 'Swaziland', 'Slovak Republic', 'Slovenia', 'Sri Lanka', 'Singapore', 'New Caledonia', 'New Zealand', 'Japan', 'Chile', 'Korea Dem. Rep.', 'Cambodia', 'Grenada', 'Greenland', 'Georgia', 'Belgium', 'Mauritania', 'Mauritius', 'Tonga', 'Saudi Arabia', 'France', 'French Polynesia', 'Faeroe Islands', 'Poland', 'Puerto Rico', 'Bosnia and Herzegovina', 'Thailand', 'Zimbabwe', 'Honduras', 'Haiti', 'Channel Islands', 'Australia', 'Ireland', 'Estonia', 'Jamaica', 'Turks and Caicos Islands', 'Trinidad and Tobago', 'Bolivia', 'Sweden', 'Switzerland', 'Vanuatu', 'Belarus', 'Bermuda', 'Kuwait', 'Comoros', 'Cote dIvoire', 'Kosovo', 'Peru', 'Tunisia', 'Lithuania', 'Somalia', 'Jordan', 'West Bank and Gaza', 'Namibia', 'Myanmar', 'Romania', 'United States', 'Virgin Islands(U.S.)', 'American Samoa', 'Lao PDR', 'Kenya', 'Finland', 'Sudan', 'Suriname', 'United Kingdom', 'Netherlands', 'Mozambique', 'Lesotho', 'Philippines', 'El Salvador', 'Samoa', 'Portugal', 'Mongolia', 'Spain', 'Benin', 'Zambia', 'Equatorial Guinea', 'Vietnam', 'Azerbaijan', 'Afghanistan', 'Algeria', 'Albania', 'Syrian Arab Republic', 'Egypt Arab Rep.', 'United Arab Emirates', 'Oman', 'Argentina', 'Aruba', 'Macedonia FYR', 'Maldives', 'Isle of Man', 'Malawi', 'Malaysia', 'Marshall Islands', 'Malta', 'Madagascar', 'Mali', 'Lebanon', 'Montenegro'];
let series_names = ['GDP growth (annual %)', 'GDP (current US$)', 'Internet users (per 100 people)', 'Rural population', 'Population female (% of total)', 'Population growth (annual %)', 'Population total', 'GDP per capita growth (annual %)', 'GDP per capita (current US$)', 'Labor force total', 'Labor force female (% of total labor force)', 'Armed forces personnel (% of total labor force)', 'Surface area (sq. km)', 'Population density (people per sq. km of land area)', 'Arable land (% of land area)', 'Unemployment total (% of total labor force) (modeled ILO estimate)', 'Unemployment female (% of female labor force) (modeled ILO estimate)'];
let series_codes = ['NY.GDP.MKTP.KD.ZG', 'NY.GDP.MKTP.CD', 'IT.NET.USER.P2', 'SP.RUR.TOTL', 'SP.POP.TOTL.FE.ZS', 'SP.POP.GROW', 'SP.POP.TOTL', 'NY.GDP.PCAP.KD.ZG',
    'NY.GDP.PCAP.CD', 'SL.TLF.TOTL.IN', 'SL.TLF.TOTL.FE.ZS', 'MS.MIL.TOTL.TF.ZS', 'AG.SRF.TOTL.K2', 'EN.POP.DNST', 'AG.LND.ARBL.ZS', 'SL.UEM.TOTL.ZS', 'SL.UEM.TOTL.FE.ZS'];
let series_max = [0.1, 15e11, 10, 1e8, 5, 0.02, 2e8, 0.1, 10000, 1e8, 5, 0.03, 2e6, 50, 5, 2, 2];
let data_array = [];
let bar_data = Array(17).fill(0);
let bar_data1 = [];
let svg0;
let grid_size = 40;
d3.csv("countriesData.csv", function (error, data) {
    if (error) {
        console.log(error);
    }
    allData = data;
    console.log(allData);
    handle_data();
    draw_table();
})

function handle_data() {
    for (let i = 0; i < 215; ++i) {
        data_array[i] = [];
        for (let j = 0; j < 17; ++j) {
            data_array[i][j] = [];
            for (let k = 0; k < 5; ++k) {
                data_array[i][j][k] = Number(allData[i * 17 + j][allData.columns[k + 4]]);
            }
        }
    }
}

function draw_table() {

    //声明svg
    svg0 = d3.select("body").append("svg")
        .attr("height", 65 * grid_size)
        .attr("width", 40 * grid_size)
        .append("g")
        .attr("transform", "translate(10,10)")
        .attr("height", 13 * grid_size)
        .attr("width", 21 * grid_size);
    /**** 下拉选择框 ****/
    let content = document.getElementById('content');
    let selectItem = document.getElementById('selectItem');

    let ul = document.createElement('ul');
    selectItem.appendChild(ul);
    for (let i = 0; i < countries_names.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('index', i);
        li.innerText = countries_names[i];
        ul.appendChild(li);
    }

    content.onclick = function () {
        if (selectItem.style.display === 'none' || selectItem.style.display === '') {
            selectItem.style.display = 'block';
        } else {
            selectItem.style.display = 'none';
        }
    }

    let lis = selectItem.getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            content.innerText = this.innerHTML;
            content.setAttribute("index", this.getAttribute("index"));
            selectItem.style.display = 'none';
        }
    }
    content.innerText = '<- Country Name ->';

    let content1 = document.getElementById('content1');
    let selectItem1 = document.getElementById('selectItem1');
    let ul1 = document.createElement('ul');
    selectItem1.appendChild(ul1);
    for (let i = 0; i < years.length; i++) {
        let li1 = document.createElement('li');
        li1.setAttribute('index', i);
        li1.innerText = years[i];
        ul1.appendChild(li1);
    }

    content1.onclick = function () {
        if (selectItem1.style.display === 'none' || selectItem1.style.display === '') {
            selectItem1.style.display = 'block';
        } else {
            selectItem1.style.display = 'none';
        }
    }

    let lis1 = selectItem1.getElementsByTagName('li');
    for (let i = 0; i < lis1.length; i++) {
        lis1[i].onclick = function () {
            content1.innerText = this.innerHTML;
            content1.setAttribute("index", this.getAttribute("index"));
            selectItem1.style.display = 'none';
        }
    }
    content1.innerText = '<- Years ->';


    /**** 根据选择框做表 ****/
    let table_left = svg0.selectAll(".main_table")
        .data(series_names)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return 10;
        })
        .attr("y", function (d, i) {
            return i * grid_size + 50;
        })
        .attr("width", grid_size * 22)
        .attr("height", grid_size - 1)
        .attr("fill", function (d, i) {
            if (i % 2 === 0) {
                return "#ecf393"
            }
            return "#77eadd"
        })
        .attr("class", "main_table")
        .on("click", Mclick);
    let left_text = svg0.selectAll("left_text")
        .data(series_names)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return 15;
        })
        .attr("y", function (d, i) {
            return i * grid_size + 75;
        })
        .text(function (d) {
            return d;
        })
        .attr("class", "text0");
    let table_right = svg0.selectAll(".main_table_right")
        .data(series_names)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return 10 + grid_size * 22;
        })
        .attr("y", function (d, i) {
            return i * grid_size + 50;
        })
        .attr("width", grid_size * 4)
        .attr("height", grid_size - 1)
        .attr("fill", function (d, i) {
            return "#f5e2e2"
        })
        .attr("class", "main_table")
        .on("click", Mclick);

    let right_text = svg0.selectAll("right_text")
        .data(bar_data)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return 20 + grid_size * 22;
        })
        .attr("y", function (d, i) {
            return i * grid_size + 75;
        })
        .text(function (d) {
            return d;
        })
        .attr("class", "text0");

    let button = svg0.selectAll("button")
        .data(["select"])
        .enter().append("rect")
        .attr("x", 300)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 40)
        .attr("class", "button")
        .on("click", function () {
            console.log("click");
            bar_data = [];
            let c = document.getElementById("content").getAttribute("index");
            let y = document.getElementById("content1").getAttribute("index");
            console.log(c, y);

            for (let i = 0; i < 17; ++i) {
                bar_data[i] = data_array[Number(c)][i][Number(y)];
            }
            console.log(bar_data);
            /*
            svg0.selectAll("right_text")
                .data([])
                .exit().remove();
             */
            right_text
                .data(bar_data)
                .attr("x", function (d, i) {
                    return 20 + grid_size * 22;
                })
                .attr("y", function (d, i) {
                    return i * grid_size + 75;
                })
                .text(function (d) {
                    return d;
                })
                .attr("class", "text0");
        });

    let button_text = svg0.selectAll("button_text")
        .data(["select"])
        .enter().append("text")
        .attr("x", 338)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .attr("class", "button_text")
        .text(function (d) {
            return d;
        });

    let svg1 = d3.select("body")
        .select("svg")
        .append("g")
        .attr("height", 10 * grid_size)
        .attr("width", 30 * grid_size)
        .attr("transform", "translate(" + 0 + "," + 850 + ")");
    let svg2 = d3.select("body")
        .select("svg")
        .append("g")
        .attr("height", 10 * grid_size)
        .attr("width", 30 * grid_size)
        .attr("transform", "translate(" + 0 + "," + 1650 + ")");

    let max_y = 100;
    let min_y = 0;
    let y = d3.scaleLinear()
        .domain([min_y, max_y])
        .range([0, 200]);

    svg1.selectAll("rect")
        .data(Array(5).fill(0))
        .enter().append("rect")
        .attr("height", function (d) {
            return y(d);
        })
        .attr("width", "10")
        .attr("x", function (d, i) {
            return (i * 60) + 2 * grid_size
        })
        .attr("y", function (d) {
            return 300 - y(d);
        });

    svg1.selectAll("text")
        .data(Array(16).fill(0))
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("class", "bar_text")
        .attr("x", function (d, i) {
            return -30
        });


    let path = d3.geoPath();
    let projection = d3.geoMercator()
        .scale(150)
        .center([0, 20])
        .translate([800, 100]);
    let data = d3.map();


// Load external data and boot
    d3.queue()
        .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .defer(d3.csv, 'countries1.csv',
            function (d) {
                data.set(d['Code'], +d[years[Number(document.getElementById("content1").getAttribute("index"))] + series_codes[0]]);
            })
        .await(ready);

    function ready(error, topo) {
        let colorScale = d3.scaleLinear()
            .domain([-1, series_max[0]])
            .range(d3.schemeBlues[7]);
        // Draw the map
        svg2
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
            // draw each country
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            // set the color of each country
            .attr("fill", function (d) {
                return '#eeeeee'
            })
    }

    function Mclick() {

// Map and projection
        let This = d3.select(this);
        let y_position = (This.attr("y") - 50) / grid_size;
        let country = document.getElementById("content").getAttribute("index");
        let year = document.getElementById("content1").getAttribute("index");
        bar_data1=[];
        bar_data1 = data_array[Number(country)][y_position];

        max_y = d3.max(bar_data1);
        min_y = d3.min(bar_data1);
        console.log(bar_data1,min_y,max_y);
        if (min_y > 0.01) {
            min_y = (max_y - 2 * min_y);
            if(min_y<0) min_y=-min_y;
        } else {
            min_y = 0;
        }
        if(max_y===min_y)min_y=-1;
        y = d3.scaleLinear()
            .domain([min_y, max_y])
            .range([0, 300]);
        svg1.selectAll("rect")
            .data(bar_data1)
            .attr("class", "bar1")
            .attr("height", function (d) {
                return y(d);
            })
            .attr("width", "100")
            .attr("x", function (d, i) {
                return (i * 160) + 2 * grid_size
            })
            .attr("y", function (d) {
                return 300 - y(d);
            });
        let info=[];
        info[0]='Country:';
        info[1]=content.innerText;
        info[2]='Year:';
        info[3]=content1.innerText;
        info[4]='Series:';
        info[5]=series_names[y_position];
        svg1.selectAll("text")
            .data(bar_data1.concat(years).concat(info))
            .text(function (d) {
                return d;
            })
            .attr("class", function (d,i){
                if(i===11||i===13||i===15)
                    return 'info';
                return 'text0'
            })
            .attr("x", function (d, i) {
                if (i<5)
                    return 5 + (i * 160) + 2 * grid_size;
                if(i<12)
                    return 15 + ((i-5) * 160) + 2 * grid_size;
                let offset=15+2*grid_size;
                if(i===13||i===15)
                    offset=0;

                return offset + ((i-12) * 200);


            })
            .attr("y", function (d,i) {
                if (i<5)
                    return 290 - y(d);
                if (i<12)
                    return 330;
                return 440;
            });



// Data and color scale
        let data = d3.map();


// Load external data and boot
        d3.queue()
            .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .defer(d3.csv, 'countries1.csv',
                function (d) {
                    data.set(d['Code'], +d[years[Number(year)] + series_codes[y_position]]);
                })
            .await(ready);

        function ready(error, topo) {
            let colorScale = d3.scaleLinear()
                .domain([-1, series_max[y_position]])
                .range(d3.schemeBlues[7]);
            // Draw the map
            svg2
                .selectAll("path")
                .data(topo.features)
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .on("mouseover",function (){
                    let This = d3.select(this);
                    let content = This.html();
                    d3.select(this).append("title").text(function (d){return [d.id,d.total];});
                })
                .on("mouseout",function (){
                    let This = d3.select(this);
                    let content = This.html();
                    d3.select(this).selectAll('title').data([]).exit().remove();
                });

        }
    }



}

