(function(window, document, $){

var words, wordTypes, $generateBtn, $lead;

words = {};
wordTypes = [
    'adverbs',
    'verbs',
    'adjectives',
    'nouns'
]; // Order matters

function updatePhraseUi(phrase){
    $lead.html(phrase);
}

function generate () {
    var phrase, wordType, wordCount, rand;

    phrase = "";

    for (var i in wordTypes) {

        wordType  = wordTypes[i];
        wordCount = words[wordType].length;
        rand      = Math.round(Math.random() * (wordCount - 1));
        phrase    = phrase + words[wordType][rand] + " ";
    }

    phrase = $.trim(phrase) + '.';

    return phrase;
}

function init(){
    var wordType;

    $generateBtn = $('.jumbotron #generate');
    $lead        = $(".jumbotron .lead");

    function success(response) {
        words[wordType] = response.data;
    }

    $generateBtn.on('click', function(e) {
        e.preventDefault();
        updatePhraseUi(generate());
    });

    // load data
    for (var i in wordTypes) {
        wordType = wordTypes[i];

        $.ajax({
            dataType: "json",
            url     : "data/" + wordType + ".json",
            async   : false,
            success: success
        });
    }

    // initial word generation
    updatePhraseUi(generate());
}

// DOM Ready
$(function() {
    init();
});

}(window, document, window.jQuery));

