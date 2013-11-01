var phrase = "";
var words = {};
var wordTypes = [
     'adverbs'
    ,'verbs'
    ,'adjectives'
    ,'nouns'
]; // Order matters

$(function() {

    $( "div.jumbotron a#generate" ).click(function() {
        event.stopPropagation();
        generate();
    });

    for (var i in wordTypes) {
        var wordType = wordTypes[i];
        $.ajax({
            dataType: "json",
            url: "data/"+wordType+".json",
            async: false,
            success: function( r ) {
                words[wordType] = r.data ;
            }
        });
    }

    generate();

});

function generate () {
    phrase = "";
    for (var i in wordTypes) {
        var wordType = wordTypes[i];
        wordCount = words[wordType].length;
        rand = Math.round( Math.random() * (wordCount - 0) );
        phrase = phrase + words[wordType][rand] + " ";
    }
    phrase = $.trim(phrase)+'.';
    $( "div.jumbotron p.lead" ).html(phrase);
    return phrase;
}