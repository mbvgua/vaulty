import handlebars from "handlebars";
import fs from "fs";
import path from "path";

export function createTemplate(pathToTemplate:string) {
  try {
    const templatePath = path.resolve(__dirname, pathToTemplate);
    const source = fs.readFileSync(templatePath, "utf8");
    const compiledTemplate = handlebars.compile(source);
        console.log(compiledTemplate)

    return compiledTemplate;
  } catch (error) {
    return console.log(
      JSON.stringify({
        code: 400,
        status: "success",
        message: "An error occurred: ",
        data: error,
        metadata: null,
      }),
    );
  }
}

//TODO: this items retuen an unresolved promise. Figure out how to make it work, which in turn makes the helper usable
//const dummy = createTemplate("../../../templates/verify-email.html")
//
//console.log(dummy)
