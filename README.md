DESCRIPTION
===================================
A responsive slider to be used with forms of questions and answers. The animation may be disabled by simply removing a CSS class.
This slider uses bootstrap, be sure to change the path to your bootstrap files.

## USAGE
Keep class enableSlider to use animation. Remove it for a simple form.

```html
<div class="boxSurvey enableSlider">
    <div class="progressBarContainer">
        <div class="infoCountQuestions">
            Question <span class="actualQuestionNumber">1</span>/<span class="countQuestionsNumber">1</span>
        </div>
        <div class="progressBarBkg">
            <div class="progressBarFilling"></div>
        </div>
    </div>
    <div class="boxQuestions">
        <div class="itemQuestion"></div>
        <div class="itemQuestion"></div>
        <div class="itemQuestion"></div>
    </div>
</div>