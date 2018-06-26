      
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
            //console.log(i);
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

            //Section 1- Part 6

            var s1p7 = s.indexOf("Checkwhichcurrentlyapplies");
            var p6 = s.substring(s1p7 , s1p8);
            //console.log(p6);
            if(p6.length > 0  && p6.indexOf("Pizza") <0){
                var countp6 = 0;
                var array_p6 = ["Exercise regularly at least twice a week", "Fatigue","Weight gain", "Weakness", "Muscle atrophy",
                                "Depression", "Lack of flexibility and good balance",  "Heart problems" ];
                for(j=0; j< array_p6.length; j++){
                    if(p6.indexOf(array_p6[j].replace(/ /g,'')) >= 0){
                        countp6++;
                        }
                }
                console.log("Section 1 - part 6" , countp6);
            }

            //Section 1 - Part 7
            var s1p8 = s.indexOf("Checkwhatappliestoyoupresently");
            var p7 = s.substring(s1p7,s1p8);
            //console.log(p7);
            if(p7.length > 0  && p7.indexOf("Pizza") <0){
                var countp7 = 0;
                var array_p7 = ["Painful or hard bowel movements", "Constipated, less than 1 bowel movement a day", "Varicose veins",
                                "Hemorrhoids or rectal fissures", "Use lots of toilet paper to clean yourself",
                                "Stools are pencil size and drop to the bottom of the toilet"  ];
                for(j=0; j< array_p7.length; j++){
                    if(p7.indexOf(array_p7[j].replace(/ /g,'')) >= 0){
                        countp7++;
                    }
                }
                console.log("Section 1 - part 7" , countp7);
            }

            //Section 1 - Part 8
            var s1p9 = s.indexOf("FriedFoods");
            var p8 = s.substring(s1p8,s1p9);
            //console.log(p8);
            if(p8.length > 0  && p8.indexOf("Pizza") <0){
                var countp8 = 0;
                var array_p8 =["Consume six types of vegetables daily", "Eat at least two types of fruit daily", "Consume at least an ounce of raw nuts daily",
                                "50% of my diet is made up of raw foods", "I do not consume dairy, wheat or gluten containing foods",
                                "I consume very little dairy or gluten (2 to 3 meals a week)", "Eat fresh and/or organic foods as much as possible",
                                "Vegetarian", "Vegan", "Eat white fish two to three times a week" ];
                for(j=0; j< array_p8.length; j++){
                    if(p8.indexOf(array_p8[j].replace(/ /g,'')) >= 0){
                        countp8++;
                    }
                }
                console.log("Section 1 - part 8" , countp8);
            }

            var biotin = s.indexOf("Biotin");
            //console.log(biotin);
            var cal = s.indexOf("Calcium");
            var chrom = s.indexOf("Chromium");
            var copper = s.indexOf("Copper");
            var fatty = s.indexOf("EssentialFattyAcids");
            var protein = s.indexOf("Protein");
            var carb = s.indexOf("Carbohydrates");
            var folic = s.indexOf("FolicAcid");
            var iodine = s.indexOf("Iodine");
            var iron = s.indexOf("Iron");
            var mag = s.indexOf("Magnesium");
            var nia = s.indexOf("Niacin");
            var acid = s.indexOf("PantothenicAcid(B5)");
            var pot = s.indexOf("Potassium");
            var pyr = s.indexOf("Pyridoxine(B6)");
            var ribo = s.indexOf("Riboflavin");
            var sel = s.indexOf("Selenium");
            var thia = s.indexOf("Thiamin");
            var vita = s.indexOf("VitaminA");
            var vitb12 = s.indexOf("VitaminB-12");
            var vitc = s.indexOf("VitaminC");
            var coq = s.indexOf("CoQ10");
            var vitd = s.indexOf("VitaminD");
            var vite = s.indexOf("VitaminE");
            var vitk = s.indexOf("VitaminK");
            var zinc = s.indexOf("Zinc");

            var all = ["Biotin" , "Calcium" , "Chromium" , "Copper", "Essential Fatty Acids",
                        "Protein", "Carbohydrates", "Folic Acid", "Iodine" , "Iron" , "Magnesium","Manganese",
                        "Niacin", "PantothenicAcid(B5)" ,"Potassium", "Pyridoxine(B6)", "Riboflavin",
                        "Selenium","Thiamin", "VitaminA", "VitaminB-12",  "VitaminC", "CoQ10",
                        "VitaminD","VitaminE", "VitaminK","Zinc"] ;

            var a_biotin =["Dermatitis", "Eye inflammation", "Hair loss", 
                            "Loss of muscle control", "Insomnia", "Muscle weakness"];
            var a_cal = ["Brittle nails", "cramps", "delusions", "depression", "insomnia", "irritability", 
                        "osteoporosis", "palpitations", "periodontal disease", "rickets", "tooth decay"];
            var a_chrom = ["Anxiety", "fatigue", "glucose intolerance", "adult-onset diabetes"];
            var a_copper = ["Anemia", "arterial damage", "depression", "diarrhea", "fatigue", "fragile bones", 
                            "hair loss", "hyperthyroidism", "weakness"];
            var a_fatty = ["Diarrhea", "dry skin and hair", "hair loss", "immune impairment", "infertility", 
                            "poor wound healing", "premenstrual syndrome", "acne", "eczema", "gall stones", "liver degeneration", 
                            "headaches when out in the hot sun", "sunburn easily or suffer sun poisoning"];
            var a_protein = ["Increased secretion from mouth/nose/eyes", "Swelling in hands and feet", "muscle cramps", 
                            "Menstrual cramps", "low exercise tolerance", "cold hands and feet", "bleeding gums", "low immunity", 
                            "fatigue", "muscles more flabby than normal", "hair loss", "splitting hair and nails", "low heart rate", "hypoglycemia"];
            var a_carbs = [	"Decreased secretions from mouth/nose/eyes", "Muscle weakness", "inability to concentrate", 
                            "easily startled", "difficulty swallowing", "voice affected by stress"];
            var a_folic = ["Anemia", "apathy", "diarrhea", "fatigue", "headaches", "insomnia", "loss of appetite", "neural tube defects in fetus", 
                            "paranoia", "shortness of breath", "weakness"];
            var a_ion= ["Cretinism", "fatigue", "hypothyroidism", "weight gain"];
            var a_iron = ["Anemia", "brittle nails", "confusion", "constipation", "depression", "dizziness", "fatigue", "headaches", "inflamed tongue", "mouth lesions"];
            var a_mag = ["Anxiety", "confusion", "heart attack", "hyperactivity", "insomnia", "nervousness", "muscular irritability", "restlessness", "weakness", "hypertension"]; 
            var a_man = ["Atherosclerosis", "dizziness"," elevated cholesterol", "glucose intolerance", "hearing loss", "loss of muscle control, ringing in ears"];
            var a_nia = ["Bad breath", "canker sores", "confusion", "depression", "dermatitis", "diarrhea", "emotional instability", "fatigue", "irritability", "loss of appetite", "memory impairment", 
                        "muscle weakness", "nausea", "skin eruptions and inflammation", "high cholesterol or triglycerides", "poor circulation"];
            var a_Acid = ["Abdominal pains", "burning feet", "depression", "eczema", "fatigue", "hair loss", "immune impairment", "insomnia", "irritability", "low blood pressure", "muscle spasms", 
                        "nausea", "poor coordination"];
            var a_pot = ["Acne", "constipation", "depression", "edema", "excessive water consumption", "fatigue", "glucose intolerance", "high cholesterol levels", "insomnia", "mental impairment", 
                        "muscle weakness", "nervousness", "poor reflexes"];
            var a_pyr = ["Acne", "anemia", "arthritis", "eye inflammation", "depression", "dizziness", "facial oiliness", "fatigue", "impaired wound healing", "irritability", "loss of appetite", 
                        "loss of hair", "mouth lesions", "nausea"];
            var a_ribo = ["Blurred vision", "cataracts", "depression", "dermatitis", "dizziness", "hair loss", "inflamed eyes","mouth lesions", "nervousness", "neurological symptoms (numbness, loss of sensation, \"electric shock\" sensations)", 
                          "seizures", "sensitivity to light", "sleepiness", "weakness"];
            var array_positive =[];
            for(k=0; k<all.length;k++){
                //console.log(s.indexOf(all[i]));
                if(s.indexOf(all[k]) >= 0 ){
                    //console.log("In");
                    array_positive.push(all[k].replace(/ /g,''));
                }
            }

            if(array_positive.length > 0){
                for(n = 0; n<array_positive.length ; n++){
                    if(n < (array_positive.length - 1)){
                          var temp = s.substring(array_positive[i] , array_positive[i+1]); 
                    }else{ //last member of array
                                 
                    }

                    if(array_positive[i] == "Biotin"){
                    }
                    
                }
            }
            console.log(array_positive);            

        }
    });

}, function (reason) {
    // PDF loading error
    console.log("Error loading pdf");
    console.error(reason);
    
});