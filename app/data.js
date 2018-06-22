      
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
        console.log(pagesText);
        console.log(pagesText[0].length);
        //document.getElementById("test").innerHTML = pagesText[1].length;
        for(i = 0; i <pagesText.length;i++){
            var s = pagesText[i].replace(/ /g,'');
            
            var s1p1 = s.indexOf("Checkanythatyouharbororareexperiencingforyourselfortowardsothersatthistime."); // Section 1- part 1
            var s1p2 = s.indexOf("Checkwhatcurrentlyappliestoyou"); // Section 1 - part 2
            var p1 = s.substring(s1p1 , s1p2);
            console.log(p1);
            if(p1.length > 0){ 
                var countp1 = 0;
                console.log(p1.indexOf("Fear"));
                if(p1.indexOf("Anger") >=0){
                    countp1++;
                    console.log(countp1);
                }if(p1.indexOf("Bitterness") >= 0){
                    countp1++;
                    console.log(countp1);
                }if(p1.indexOf("Fear") >=0){
                    countp1++;
                    console.log(countp1);
                }
                console.log(countp1);
                document.getElementById("demo").innerHTML = countp1;
            }
            
            
            var s1p3 = s.indexOf("Checkwhichcurrentlyapplies"); // Section 1 - part 3 and 4
            var p2 = s.substring(s1p2 , s1p3);
            var s1p5 = s.indexOf("Checkwhatyouarecurrentlyexperiencing"); // Section 1 - Part 5
            var p3p4 = s.substring(s1p3 , s1p5);
            //console.log(i, s1p5 , s1p3, p3p4);
        }
    });

}, function (reason) {
    // PDF loading error
    console.log("Error loading pdf");
    console.error(reason);
    
});