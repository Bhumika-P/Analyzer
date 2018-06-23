      
      // Specify the path to the worker
      
      PDFJS.workerSrc = 'pdf.worker.js';

      function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";

                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];

                    finalString += item.str + " ";
                }

                // Solve promise with the text retrieven from the page
                resolve(finalString);
            });
        });
    });
}
var PDF_URL = 'form.pdf';

PDFJS.getDocument(PDF_URL).then(function (pdf) {

    var pdfDocument = pdf;
    // Create an array that will contain our promises 
    var pagesPromises = [];
    console.log(pdf.pdfInfo.numPages);
    for (var i = 0; i < pdf.pdfInfo.numPages; i++) {
        // Required to prevent that i is always the total of pages
        (function (pageNumber) {
            // Store the promise of getPageText that returns the text of a page
            pagesPromises.push(getPageText(pageNumber, pdfDocument));
        })(i + 1);
    }

    // Execute all the promises
    Promise.all(pagesPromises).then(function (pagesText) {

        // Display text of all the pages in the console
        // e.g ["Text content page 1", "Text content page 2", "Text content page 3" ... ]
        //console.log(pagesText);
        //console.log(pagesText[0].length);
        //document.getElementById("test").innerHTML = pagesText[1].length;
        for(i = 0; i <pagesText.length;i++){
            var s = pagesText[i].replace(/ /g,'');
            
            var s1p1 = s.indexOf("Checkanythatyouharbororareexperiencingforyourselfortowardsothersatthistime."); // Section 1- part 1
            var s1p2 = s.indexOf("Checkwhatcurrentlyappliestoyou"); // Section 1 - part 2
            var p1 = s.substring(s1p1 , s1p2);
            //Section 1 - part 1
            if(p1.length > 0){
                var countp1=0;
                var array_p1= ["Fear" , "Anger" , "Bitterness" , "Grief", "Gossip", "Helplessness", "Hopelessness",
                                "Guilt", "Betrayal", "Envy" , "Jealousy","Insecurity","Impatient","Arrogance",
                                "Pride", "Hatred", "Rage", "Resentment", "Revenge", "Shame", "Sorrow", "Regret",
                                "Passivity", "Slander", "Possessiveness", "Rebellion", " Unforgiveness", "Gambling",
                                "Addictions"];
                for(j =0 ; j <array_p1.length; j++){
                    if(p1.indexOf(array_p1[j]) >= 0){
                        countp1++;
                    }
                }
                //console.log(array_p1.length);
                console.log("Section 1 - part 1" , countp1);
                document.getElementById("demo").innerHTML = countp1;
            }
            var s1p3 = s.indexOf("Checkwhichcurrentlyapplies"); // Section 1 - part 3 and 4
            //Section 1 - part 2- Need to fix extra string problem
            var p2 = s.substring(s1p2 , s1p3);
            if(p2.length > 0 && p2.indexOf("Pizza") <0 ){
                var countp2 = 0;
                var array_p2 = ["Always Indoors", " DO not regularly change home filter", "Home has mold", "Home has an air ionizer",
                                "Have plenty of green plants in my living space", "Practice deep breathing exercises regularly, especially outdoors",
                                " I live away from city smog", " Dizziness", "Headaches", " WateryEyes", "Sneezing", "Cough Regularly",
                                "Fatigue", "Smoke cigarettes regularly"];
                for(j=0; j< array_p2.length; j++){
                    if(p2.indexOf(array_p2[j].replace(/ /g,'')) >= 0){
                        countp2++;
                    }
                }
                console.log("Section 1 - part 2" , countp2);
            }
            var s1p5 = s.indexOf("Checkwhatyouarecurrentlyexperiencing"); // Section 1 - Part 5
            //Section 1- part 3 and 4
            var p3p4 = s.substring(s1p3 , s1p5);
            //console.log(p3p4);
            if(p3p4.length > 0 && p3p4.indexOf("Pizza") <0){
                var countp3 = 0;
                var countp4 = 0;
                var array_p3 = ["Dry mouth, dry eyes, dry nasal membranes", "Dry or leathery skin", "Dry or chapped lips",
                                "Stools hard & Dry", "Low volume of urine, urinate infrequently", "Dark urine (dark yellow or orange)",
                                "Poor skin turgor (loss of elasticity of skin)" , "Headaches", "Leg and arm cramps", "Weakness",
                                "Drink less than eight 8 ounce glasses of water daily" ];
                var array_p4 = ["Depression", "Poor Bone Health" , "Low Vitamin D levels", "Outfoors at least 30 minutes a day"];
                for(j=0; j< array_p3.length; j++){
                    if(p3p4.indexOf(array_p3[j].replace(/ /g,'')) >= 0){
                        countp3++;
                    }
                }
                for(j=0; j< array_p4.length; j++){
                    if(p3p4.indexOf(array_p4[j].replace(/ /g,'')) >= 0){
                        countp4++;
                    }
                }
                console.log("Section 1 - part 3" , countp3);
                console.log("Section 1 - part 4" , countp4);  
            }
            var s1p6 = s.indexOf("Checkwhichappliestoyou");
            //Section 1 - part 5
            
            var p5 = s.substring(s1p5, s1p6);
            //console.log(p5);
            if(p5.length > 0 && p5.indexOf("Pizza") <0){
                var countp5 = 0;
                var array_p5 = ["Headaches","Nausea","Brain fog","Sleep disorders", "Loss of memory", "Sensitive skin", "Dizziness", 
                                "Burning sensation", "Rash", "Vision problems", "Chest pains" , "Swollen lymph nodes", "Live near electric towers",
                                "Teeth & jaw pain", "Constantly having cellphone to the ears","On computer more than six hours","Aching muscles",
                                "Fatigue","Bouts of unexplained fear or anxiety", "Tingling or prickly sensation across face or other parts of body",
                                "Feeling of impeding influenza but never quite breaks out"];
                for(j=0; j< array_p5.length; j++){
                    if(p5.indexOf(array_p5[j].replace(/ /g,'')) >= 0){
                        countp5++;
                    }
                }
                console.log("Section 1 - part 5" , countp5);
            }   
            //console.log(i, s1p5 , s1p3, p3p4);
        }
    });

}, function (reason) {
    // PDF loading error
    console.log("Error loading pdf");
    console.error(reason);
    
});