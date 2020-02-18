// libraries
const Project = require("../../src/index").Project;
const AutoDD = require("../../src/template-api/AutoDD").AutoDD;
const renderers = require("./renderers");

// construct a project
var p = new Project("autodd_pie", "../../../config.txt");
p.addRenderingParams(renderers.renderingParams);
p.addStyles(renderers.playerRenderingStyles);

// set up auto drill down
var query = "select * from fifa19;";

var autoDD = {
    data: {
        db: "fifa19",
        query: query
    },
    layout: {
        x: {
            field: "rating",
            extent: [40, 100]
        },
        y: {
            field: "wage",
            extent: [600, 0]
        },
        z: {
            field: "wage",
            order: "desc"
        }
    },
    marks: {
        cluster: {
            mode: "pie",
            aggregate: {
                dimensions: [
                    {
                        field: "agegroup",
                        domain: ["U20", "U23", "U29", "Older"]
                    }
                ],
                measures: [
                    {
                        field: "*",
                        function: "count"
                    }
                ]
            },
            config: {
                // piePadAngle: 0.05,
                // pieCornerRadius: 5,
                // pieOuterRadius: 80,
                // pieInnerRadius: 1
            }
        },
        hover: {
            rankList: {
                mode: "tabular",
                fields: ["name", "nationality", "rating", "wage"],
                topk: 3
            },
            boundary: "convexhull"
        }
    },
    config: {
        topLevelWidth: 1500,
        topLevelHeight: 1000,
        axis: true,
        legendTitle: "Age Groups of Soccer Players in FIFA 2019",
        legendDomain: ["Under 20", "Under 23", "Under 29", "Older"]
    }
};

p.addAutoDD(new AutoDD(autoDD));
p.saveProject();
