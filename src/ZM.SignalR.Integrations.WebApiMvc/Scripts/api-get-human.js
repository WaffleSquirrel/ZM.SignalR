﻿function HumanInputModel()
{
    this.humanId = ko.observable(1);
    this.gender = ko.observable("Male");
    this.guessedNumber = ko.observable(25);
}

function HumanViewModel(humanModel) {
    this.model = humanModel;
    this.humanId = ko.observable(this.model.Id);
    this.gender = ko.observable(this.model.Gender);
    this.noteToSelf = ko.observable(this.model.NoteToSelf);
}

var response = ko.observable("Ready to search...");
var gotError = ko.observable(false);

var inputModel = new HumanInputModel();
var viewModel = new HumanViewModel(HumanModel);

var GetHuman = function (requestType) {
    errors.removeAll();

    var url = "/api/humans/get-human/" + inputModel.humanId() + "/" + inputModel.guessedNumber();

    $.ajax(url,
    {
        type: "GET",
        headers: {
            "ZM.ApiVersion": 1,
            "Gender": inputModel.gender()
        },
        data: "humanId=" + inputModel.humanId(),
        success: function (data) {
            gotError(false);

            response("Found a Human #" + data.Human.Id);

            viewModel.humanId(data.Human.Id);
            viewModel.gender(data.Human.Gender);
            viewModel.noteToSelf(data.Human.NoteToSelf);
        },
        error: function (jqXHR) {
            gotError(true);

            switch (jqXHR.status) {
                case 400:
                    errors.push("BAD REQUEST: The server could not parse the request");
                    break;
                case 401:
                    errors.push("UNAUTHORIZED: Request was not authorized by server");
                    break;
                case 404:
                    errors.push("NOT FOUND: The server could not find the resource requested.");
                    break;
                case 406:
                    errors.push("NOT ACCEPTED: Request not accepted by server");
                    break;
                case 500:
                    errors.push("INTERNAL SERVER ERROR: An error occurred on the server");
                    break;
            }

            response(jqXHR.status + " (" + jqXHR.statusText + ")");
        }
    });
};

$(document).ready(function () {
    ko.applyBindings();
    prettyPrint();
});
