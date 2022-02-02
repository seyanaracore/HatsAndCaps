const manufacturer = "Herman"
const materialsSeparator = "%";
const sizesSeparator = "Sizes";
const colorsSeparator = "Color";
const csvSep = ";"
const headers = `Model${csvSep}Info`;

const parsingTypes = {
    selectors: ["h3", ".s6", "h2", ".s9", ".s12", ".s14"],
    styles: {
        selector: "p",
        stylesVariantsList: [
            {
              fontStyle: "italic",
              fontWeight: "400",
              fontSize: "14",
            },
            {
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "15",
            },
            {
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "13",
            },
          ]
    }
}
const parseBy = "selectors"

const fileName = manufacturer + "_parsed_by_" + parseBy;
const fileFormat = "csv";