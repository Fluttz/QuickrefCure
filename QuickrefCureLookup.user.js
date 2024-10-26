// ==UserScript==
// @name         Quickref Cure Lookup
// @version      1
// @description  Make quickref link to JN's list of cures for the disease
// @author       Flutterz
// @match        https://www.jellyneo.net/?go=diseasescures*
// @match        https://www.neopets.com/quickref.phtml*
// @grant        none
// ==/UserScript==

const diseases = ["AchyHead","BloatyBelly","BloatyFeet","BlurredVision","Bubbles","Chickaroo","CrickyNeck","D'achoo","Doldrums","FloppyTongue","Fuzzitus","FuzzyFungus","Grumbles","HoochieCoochies","ItchyScratchies","Jitters","Kikoughela","Lumps","Neezles","Neggitus","NeoBlues","Neoflu","Neogitus","NeoMites","NeoMonia","NeoPhobia","NeoPox","NeoWarts","Pollenitus","Reptillioritus","ShakyFlakys","Shock-A-Lots","Sneezles","SpyderBite","Ugga-Ugga","WateryEyes"];
if (document.URL.includes("diseasescures##")){
    //Get disease name from custom url
    let name = document.URL.substring(document.URL.indexOf("##")+2);
    let num = diseases.indexOf(name);
    if (num > -1){
        //If disease is valid, wait a little to make sure the forced scroll works
        await new Promise(resolve => setTimeout(resolve, 100));
        //Find the correct disease and highlight it and the cures
        let elem = document.getElementsByTagName("h3");
        elem[3+num].style = "background-color:#FFBBBB;";
        elem[3+num].nextElementSibling.nextElementSibling.nextElementSibling.style = "background-color:#FFBBBB;";
        switch(num){
            case 5:
            case 8:
            case 11:
            case 13:
            case 21:
            case 27:
            case 29:
            case 33:
                break;
            default:
                elem[3+num].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style = "background-color:#FFBBBB;";
                break;
        }
        //Scroll to the disease
        if (num != 35){
            elem[4+num].scrollIntoView(false);
        } else {
            let elem2 = document.getElementsByTagName("h2");
            elem2[6].scrollIntoView(false);
        }
    }
} else if (document.URL.includes("quickref.phtml")){
    let elem = document.getElementsByClassName("sf");
    for (let i = 0; i < elem.length; i++){
        //Find diseases
        if (elem[i].innerText.includes("is suffering from")){
            //Change link to custom JN link
            let name = elem[i].children[0].innerText.replaceAll(" ","");
            elem[i].children[2].href = "https://www.jellyneo.net/?go=diseasescures##"+name;
            elem[i].children[2].innerText = "Find the cure on Jellyneo!";
            elem[i].children[2].target = "_blank";
            //Add healing springs link
            let br = document.createElement('br');
            elem[i].children[2].after(br);
            let link = document.createElement('a');
            link.href = "http://www.neopets.com/faerieland/springs.phtml";
            link.innerText = "Visit the Healing Springs!";
            link.target = "_blank";
            br.after(link);
        }
    }
}
