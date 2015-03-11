(function(doc, displayFunction){

    var words = {};
    var sortedWords = [];

    function parse(){
        var content = doc.body.innerText;
        var a = content.replace(/[^\w\s]|_/g, "").split(/\s+/).filter(function(arg){ return arg.length >= 4; });
        a.forEach(function(word, index, src){
            addWord(word.toLowerCase());
        });
        a.splice(0);
        a = null;
        delete(a);
        sortWords();
        words = null;
        delete(words);
    }

    function addWord(word){
        if(words.hasOwnProperty(word) == false) words[word] = [];
        words[word].push(word);
    }

    function sortWords(){
        for(var prop in words){
            if(words[prop]){
                if(Object.prototype.toString.call(words[prop]) === '[object Array]'){
                    sortedWords.push({word: prop, count: words[prop].length});
                    words[prop].splice(0);
                    words[prop] = null;
                }
            }
        }
        sortedWords.sort(function(a, b){
            if(a.word < b.word) return -1;
            if(a.word > b.word) return 1;
            return 0;
        });
    }

    function buildTagCloud(){
        var cloudContent = "";
        sortedWords.forEach(function(wordObj, index, src){
            var size = wordObj.count * 50;
            cloudContent += "<span style='font-size: " + size + "%'>" + wordObj.word + "</span><br />";
        });
        displayFunction(doc.body, cloudContent);
    }

    function dispose(){
        sortedWords.splice(0);
        sortedWords = null;
        delete(sortedWords);
    }

    parse();
    buildTagCloud();
    dispose();

})(document, function(target, cloud){
    var cloudDiv = "<div onclick='javascript:this.style.display = \"none\"' id='cloudDiv' style='cursor: pointer; cursor: hand; padding: 10px; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; border: 1px solid #828080; background-color: rgba(224, 224, 224, 0.95); -webkit-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.25); -moz-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.25); box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.25); color: #444444; font-size: 12px; font-family: sans-serif; width: 50%; position: absolute; z-index: 5000'>" + cloud + "</div>";
    target.insertAdjacentHTML("beforebegin", cloudDiv);
});