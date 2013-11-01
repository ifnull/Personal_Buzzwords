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
    var phrase, wordType;

    phrase = "";

    for (var i in wordTypes) {

        wordType  = wordTypes[i];
        wordCount = words[wordType].length;
        rand      = Math.round(Math.random() * (wordCount - 0));
        phrase    = phrase + words[wordType][rand] + " ";
    }

    phrase = $.trim(phrase)+'.';

    return phrase;
}

function init(){
    $generateBtn = $('.jumbotron #generate');
    $lead        = $(".jumbotron .lead");

    $generateBtn.on('click', function(e) {
        e.preventDefault();
        updatePhraseUi(generate());
    });

    // load data
    for (var i in wordTypes) {
        var wordType = wordTypes[i];

        $.ajax({
            dataType: "json",
            url: "data/"+wordType+".json",
            async: false,
            success: function(response) {
                words[wordType] = response.data ;
            }
        });
    }

    // generate();
    updatePhraseUi(generate());
}

// DOM Ready
$(function() {
    init();
});

}(window, document, window.jQuery));

