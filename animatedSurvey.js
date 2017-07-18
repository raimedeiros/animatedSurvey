var animating; //flag to prevent multi-animating
var currentQuestion, nextQuestion; //Question handlers
var left, opacity, scale; //animating properties
var steps, begin, end; //steps controllers
var countQuestions, sizeQuestion, sizeQuestionUpdate = 0, actualQuestionNumber = 1; //limit controllers

$(document).ready(function () {
    if ($(".boxSurvey").hasClass("enableSlider")) {
        configureItemsSlide();
    } else {
        configureItemsStatic();
    }

    function configureItemsStatic() {
        $(".itemPergunta:last").append("<div class='botoesNavegacao'>\
            <button class='endSurvey btn btn-success buttonEnabled'>Done</button></div>");
    }
    function configureItemsSlide() {
        $(".itemPergunta").append("<div class='botoesNavegacao'>\
            <button class='prevQuestion btn btn-success buttonEnabled'>Previous</button>\
            <button class='nextQuestion btn btn-success buttonEnabled'>Next</button></div>");
        $(".itemPergunta:last .botoesNavegacao").append("<button type='submit'class='endSurvey btn btn-success buttonEnabled'>Done</button>");
        beginSlider();
    }

    function beginSlider() {
        //Config actions
        begin = $(".itemPergunta:first button.prevQuestion");
        end = $(".itemPergunta:last button.nextQuestion");

        $(begin).removeClass("buttonEnabled");
        $(begin).addClass("buttonDisabled");
        $(end).removeClass("buttonEnabled");
        $(end).hide();

        countQuestions = $(".itemPergunta").length;
        sizeQuestion = 100 / countQuestions;
        sizeQuestionUpdate = sizeQuestion;
        $(".countQuestionsNumber").html(countQuestions);
        $(".barraProgressoPreenchido").css("width", sizeQuestionUpdate + "%");
        console.log(countQuestions, sizeQuestion);

        $(".nextQuestion").click(function () {
            if ($(this).hasClass("buttonDisabled")) { return };
            console.log("next");
            steps = 2;
            currentQuestion = $(this).parent().parent();
            nextQuestion = $(currentQuestion).next();
            hideThisQuestion(direction = "left", currentQuestion, nextQuestion);
            sizeQuestionUpdate = sizeQuestionUpdate + sizeQuestion;
            $(".barraProgressoPreenchido").css("width", sizeQuestionUpdate + "%");
            actualQuestionNumber = $(".actualQuestionNumber").html();
            $(".actualQuestionNumber").html(parseInt(actualQuestionNumber) + 1);
        });
        $(".prevQuestion").click(function () {
            if ($(this).hasClass("buttonDisabled")) { return };
            console.log("prev");
            steps = 2;
            currentQuestion = $(this).parent().parent();
            nextQuestion = $(currentQuestion).prev();
            hideThisQuestion(direction = "right", currentQuestion, nextQuestion);
            sizeQuestionUpdate = sizeQuestionUpdate - sizeQuestion;
            $(".barraProgressoPreenchido").css("width", sizeQuestionUpdate + "%");
            actualQuestionNumber = $(".actualQuestionNumber").html();
            $(".actualQuestionNumber").html(parseInt(actualQuestionNumber) - 1);
        });

        function validateQueue(qtdQuestion) {
            begin = true;
        }

        function hideThisQuestion(direction, currentQuestion, nextQuestion) {
            steps = steps - 1;
            if (direction == "left" && steps >= 0) {
                if (animating) return false;
                animating = true;
                currentQuestion.animate({ opacity: 0 }, {
                    step: function (now, mx) {
                        console.log("animating");
                        //opacity of currentQuestion is stored in "now"
                        //as it reduces to 0, do the following:

                        //1. bring nextQuestion from the right(50%)
                        left = -((1 - now) * 50) + "%";

                        //2. increase opacity of nextQuestion to 1 as it moves in
                        opacity = 1 - now;
                        currentQuestion.css({ 'left': left });
                    },
                    duration: 200,
                    complete: function () {
                        currentQuestion.hide();
                        animating = false;
                        showThisQuestion(direction, currentQuestion, nextQuestion)
                    }
                });
            };
            if (direction == "right" && steps >= 0) {
                if (animating) return false;
                animating = true;
                currentQuestion.animate({ opacity: 0 }, {
                    step: function (now, mx) {
                        console.log("animating");
                        //opacity of currentQuestion is stored in "now"
                        //as it reduces to 0, do the following:

                        //1. bring nextQuestion from the right(50%)
                        left = ((1 - now) * 50) + "%";

                        //2. increase opacity of nextQuestion to 1 as it moves in
                        opacity = 1 - now;
                        currentQuestion.css({ 'left': left });
                    },
                    duration: 200,
                    complete: function () {
                        currentQuestion.hide();
                        animating = false;
                        showThisQuestion(direction, currentQuestion, nextQuestion)
                    }
                });
            };
        };

        function showThisQuestion(direction, currentQuestion, nextQuestion) {
            steps = steps - 1;
            if (direction == "left" && steps >= 0) {
                console.log("show this question - left")
                if (animating) return false;
                animating = true;
                nextQuestion.show();
                nextQuestion.animate({ opacity: 1 }, {
                    step: function (now, mx) {
                        console.log("animating");
                        //opacity of nextQuestion is stored in "now"
                        //as it reduces to 0, do the following:

                        //1. bring nextQuestion from the right(50%)
                        left = ((1 - now) * 25) + "%";

                        //2. increase opacity of nextQuestion to 1 as it moves in
                        opacity = 1 - now;
                        nextQuestion.css({ 'left': left, 'opacity': opacity });
                    },
                    duration: 400,
                    complete: function () {
                        animating = false;
                        hideThisQuestion(direction, currentQuestion, nextQuestion)
                    }
                });
            };
            if (direction == "right" && steps >= 0) {
                console.log("show this question")
                if (animating) return false;
                animating = true;
                nextQuestion.show();
                nextQuestion.animate({ opacity: 1 }, {
                    step: function (now, mx) {
                        console.log("animating");
                        //opacity of nextQuestion is stored in "now"
                        //as it reduces to 0, do the following:

                        //1. bring nextQuestion from the right(50%)
                        left = -((1 - now) * 50) + "%";

                        //2. increase opacity of nextQuestion to 1 as it moves in
                        opacity = 1 - now;
                        nextQuestion.css({ 'left': left });
                    },
                    duration: 400,
                    complete: function () {
                        animating = false;
                        hideThisQuestion(direction, currentQuestion, nextQuestion)
                    }
                });
            };
            animating = false;
        };
    };
});
