export const manipulateSections = (sectionsObject) => {
    let quetionsBySections = {}

    Object.keys(sectionsObject).forEach((key) => {
        let section = key;
        let questions = sectionsObject[key]["questions"];
        let notes = sectionsObject[key]["notes"];
        quetionsBySections[section] = {}
        questions.forEach((question) => {
            if (quetionsBySections[section][`question-${question.question}`] == undefined) {
                quetionsBySections[section][`question-${question.question}`] = {}
            }
            if (quetionsBySections[section][`question-${question.question}`] == undefined) {
                quetionsBySections[section][`question-${question.question}`] = {}
            }
            quetionsBySections[section][`question-${question.question}`][question.answer] = true;
            if (notes.length > 0) {
                notes.forEach((note) => {
                    if (note.question == question.question) {
                        quetionsBySections[section][`question-${question.question}`]["notes"] = note.notes
                    }
                })
            }


        })

    })
return quetionsBySections
}
