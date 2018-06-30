      
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
            //console.log(s);
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

            //Array of all elements
            var all = ["Biotin" , "Calcium" , "Chromium" , "Copper", "EssentialFattyAcids",
                        "Protein", "Carbohydrates", "FolicAcid", "Iodine" , "Iron" , "Magnesium","Manganese",
                        "Niacin", "PantothenicAcid(B6)" ,"Potassium", "Pyridoxine(B6)", "Riboflavin",
                        "Selenium","Thiamin", "VitaminA", "VitaminB-12",  "VitaminC", "CoQ10",
                        "VitaminD","VitaminE", "VitaminK","Zinc"] ;
            //Array of all the sympots
            var a_biotin =["Dermatitis", "Eye inflammation", "Hair loss", "Loss of muscle control", "Insomnia", "Muscle weakness"];
            var a_cal = ["Brittle nails", "Cramps", "Delusions", "Depression", "Insomnia", "Irritability", 
                        "Osteoporosis", "Palpitations", "Periodontal disease", "Rickets", "Tooth decay"];
            var a_chrom = ["Anxiety", "Fatigue", "Glucose intolerance", "Adult-onset diabetes"];
            var a_copper = ["Anemia", "Arterial damage", "Depression", "Diarrhea", "Fatigue", "Fragile bones", "Hair Loss", "Hyperthyroidism", "Weakness"];
            var a_fatty = ["Diarrhea", "Dry Skin & Hair loss","Hair Loss", "Immune Impairment", "Infertility", 
                            "Poor Wound Healing", "Premenstrual Syndrome", "Acne", "Eczema", "Gall Stones", "Liver Degeneration", 
                            "Headaches when out in the hot sun", "Sunburn easily or suffer sun poisoning"];
            var a_protein = ["Increased secretion from mouth/nose/eyes", "Swelling in hands and feet", "muscle cramps", 
                            "Menstrual cramps", "low exercise tolerance", "cold hands and feet", "bleeding gums", "low immunity", 
                            "fatigue", "muscles more flabby than normal", "hair loss", "splitting hair and nails", "low heart rate", "hypoglycemia"];
            var a_carbs = [	"Decreased secretions from mouth/nose/eyes", "Muscle weakness", "Inability to concentrate", 
                            "Easily startled", "Difficulty swallowing", "Voice affected by stress"];
            var a_folic = ["Anemia", "Apathy", "Diarrhea", "Fatigue", "Headaches", "Insomnia", "Loss of Appetite", "Neural Tube Defects in Fetus", 
                            "Paranoia", "Shortness of Breath", "Weakness"];
            var a_ion= ["Cretinism", "Fatigue", "Hypothyroidism", "Weight Gain"];
            var a_iron = ["Anemia", "Brittle nails", "Confusion", "Constipation", "Depression", "Dizziness", "Fatigue", "Headaches", "Inflamed tongue", "Mouth lesions"];
            var a_mag = ["Anxiety", "Confusion", "Heart attack", "Hyperactivity", "Insomnia", "Nervousness", "Muscular irritability", "Restlessness", "Weakness", "Hypertension"]; 
            var a_man = ["Atherosclerosis", "Dizziness"," Elevated cholesterol", "Glucose intolerance", "Hearing loss", "Loss of muscle control, Ringing in ears"];
            var a_nia = ["Bad breath", "Canker sores", "Confusion", "Depression", "Dermatitis", "Diarrhea", "Emotional Instability", "Fatigue", "Irritability", "Loss of Appetite", "Memory Impairment", 
                        "Muscle Weakness", "Nausea", "Skin eruptions and Inflammation", "High cholesterol or triglycerides", "Poor circulation"];
            var a_acid = ["Abdominal Pains", "Burning Feet", "Depression", "Eczema", "Fatigue", "Hair Loss", "Immune Impairment", "Insomnia", "Irritability", "Low Blood Pressure", "Muscle Spasms", 
                        "Nausea", "Poor Coordination"];
            var a_pot = ["Acne", "Constipation", "Depression", "Edema", "Excessive Water Consumption", "Fatigue", "Glucose Intolerance", "High Cholesterol Levels", "Insomnia", "Mental Impairment", 
                        "Muscle Weakness", "Nervousness", "Poor Reflexes"];
            var a_pyr = ["Acne", "Anemia", "Arthritis", "Eye Inflammation", "Depression", "Dizziness", "Facial Oiliness", "Fatigue", "Impaired Wound Healing", "Irritability", "Loss of Appetite", 
                        "Loss of Hair", "Mouth Lesions", "Nausea"];
            var a_ribo = ["Blurred Vision", "Cataracts", "Depression", "Dermatitis", "Dizziness", "Hair Loss", "Inflamed Eyes","Mouth Lesions", "Nervousness", 
                         "Neurological Symptoms (Numbness, Loss Of Sensation, \"Electric Shock\" Sensations)", "Seizures", "Sensitivity to Light", "Sleepiness", "Weakness"];
            var a_sel = ["Growth Impairment", "High Cholesterol Levels", "Increased Incidence of Cancer", "Pancreatic Insufficiency (Inability to secrete adequate amounts of digestive enzymes)", 
                        "Immune Impairment", "Liver Impairment", "Male Sterility"];
            var a_thia = ["Confusion", "Constipation", "Digestive Problems", "Irritability", "Loss of Appetite", "Memory Loss", "Nervousness", "Numbness of Hands & Feet", "Pain Sensitivity", 
                        "Poor Coordination", "Weakness", "Slow Heart Beat or Rapid Heartbeat", "Enlarged Heart", "Heart Palpitations"];
            var a_vita  = ["Acne", "Dry Hair", "Fatigue", "Growth Impairment", "Insomnia", "Hyperkeratosis (Thickening & roughness of skin)", "Immune Impairment", "Night Blindness", "Weight Loss"];
            var a_vitb12 = ["Anemia", "Constipation", "Depression", "Dizziness", "Fatigue", "Intestinal Disturbances", "Headaches", "Irritability", "Loss of Vibration Sensation", "Low Stomach Acid", "Mental Disturbances", 
                            "Moodiness", "Mouth Lesions", "Numbness", "Spinal Cord Degeneration"];
            var a_vitc = ["Bleeding Gums", "Depression", "Easy Bruising", "Impaired Wound Healing", "Irritability", "Joint Pains", "Loose Teeth", "Malaise", "Tiredness"];
            var a_coq = ["Ataxia", "Cardiomyopathy", "Cerebellar Atrophy", "Muscle Weakness", "Fatigue", "Seizures", "Kidney Failure", "Encephalopathy", "Learning Disabilities", "Myoglobinuria", "Sensorineural Deafness", "Scoliosis", "Lactic Acidemia", 
                        "Spasticity", "Hyper-Reflexes", "Weakened Eye muscles", "Atrophying of Muscle Tissue", "Gum Disease"];
            var a_vitd=["Burning Sensation in Mouth", "Diarrhea", "Insomnia", "Myopia", "Nervousness", "Osteomalacia", "Osteoporosis", "Rickets", "Scalp Sweating", "Poor Immunity"];
            var a_vite = ["Gait Disturbances", "Poor Reflexes", "Loss of Position Sense", "Loss of Vibration Sense", "Shortened Red Blood Cell Life"];
            var a_vitk = ["Bleeding Disorders", "Arteriolosclerosis", "Spurs", "Calcium Deposits"];
            var a_zinc = ["Acne", "Amnesia", "Apathy", "Brittle Nails", "Delayed Sexual Maturity", "Depression", "Diarrhea", "Eczema", "Fatigue","Growth Impairment", "Hair Loss", "High Cholesterol Levels", "Immune Impairment", "Impotence", "Irritability", "Lethargy", 
                         "Loss of Appetite", "Loss of Sense of Taste", "Low Stomach Acid", "Male Infertility", "Memory Impairment", "Night Blindness", "Paranoia", "White Spots on Nails", "Wound Healing Impairment", "Low Testosterone"];
            var array_positive =[];

            //Counters
            var c_biotin = 0;
            var c_cal = 0;
            var c_chrom = 0;
            var c_copper = 0;
            var c_fatty = 0;
            var c_protein = 0;
            var c_carbs = 0;
            var c_folic = 0;
            var c_ion = 0;
            var c_iron = 0;
            var c_mag = 0;
            var c_man = 0;
            var c_nia = 0;
            var c_acid = 0;
            var c_pot = 0;
            var c_pyr = 0;
            var c_ribo = 0;
            var c_Sel = 0;
            var c_thia = 0;
            var c_vita=0;
            var c_vitb12 = 0;
            var c_vitc=0;
            var c_coq = 0;
            var c_vitd = 0;
            var c_vite = 0;
            var c_vitk=0;
            var c_zinc = 0;

            for(k=0; k<all.length;k++){
                //console.log(s.indexOf(all[i]));
                if(s.indexOf(all[k]) >= 0 ){
                    //console.log("In");
                    array_positive.push(all[k].replace(/ /g,''));
                }
            }
           // console.log(array_positive);
            if(array_positive.length > 0){
                for(n = 0; n<array_positive.length ; n++){
                    
                    if(n < (array_positive.length - 1)){
                          var index1 = s.indexOf(array_positive[n]);
                          var index2 = s.indexOf(array_positive[n+1]);
                          var temp = s.substring(index1 , index2); 
                          //console.log(temp);
                    }else{ //last member of array
                          console.log(array_positive[n]);
                          var index1 = s.indexOf(array_positive[n]);
                          var index2 = s.indexOf("I."); //Fix this to number when you can 
                          //console.log(pagesText[i].length);
                          if(index2 <0){
                            var temp = s.substring(index1 , pagesText[i].length);
                          }else{
                            var temp = s.substring(index1 , index2);
                          }
                    }

                    if(array_positive[n].localeCompare("Biotin") == 0){
                        for(j=0; j< a_biotin.length; j++){
                            if(temp.indexOf(a_biotin[j].replace(/ /g,'')) >= 0){
                                c_biotin++;
                            }
                        }                     
                    }else if(array_positive[n].localeCompare("Calcium") == 0){
                        for(j=0; j< a_cal.length; j++){
                            if(temp.indexOf(a_cal[j].replace(/ /g,'')) >= 0){
                                c_cal++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Chromium") == 0){
                        for(j=0; j< a_chrom.length; j++){
                            if(temp.indexOf(a_chrom[j].replace(/ /g,'')) >= 0){
                                c_chrom++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Copper") == 0){
                        for(j=0; j< a_copper.length; j++){
                            if(temp.indexOf(a_copper[j].replace(/ /g,'')) >= 0){
                                c_copper++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("EssentialFattyAcids") == 0){
                        for(j=0; j< a_fatty.length; j++){
                            if(temp.indexOf(a_fatty[j].replace(/ /g,'')) >= 0){
                                c_fatty++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Protein") == 0){
                        for(j=0; j< a_protein.length; j++){
                            if(temp.indexOf(a_protein[j].replace(/ /g,'')) >= 0){
                                c_protein++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Carbohydrates") == 0){
                        for(j=0; j< a_carbs.length; j++){
                            if(temp.indexOf(a_carbs[j].replace(/ /g,'')) >= 0){
                                c_carbs++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("FolicAcid") == 0){
                        for(j=0; j< a_folic.length; j++){
                            if(temp.indexOf(a_folic[j].replace(/ /g,'')) >= 0){
                                c_folic++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Iodine") == 0){
                        for(j=0; j< a_ion.length; j++){
                            if(temp.indexOf(a_ion[j].replace(/ /g,'')) >= 0){
                                c_ion++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Iron") == 0){
                        for(j=0; j< a_iron.length; j++){
                            if(temp.indexOf(a_iron[j].replace(/ /g,'')) >= 0){
                                c_iron++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Magnesium") == 0){
                        for(j=0; j< a_mag.length; j++){
                            if(temp.indexOf(a_mag[j].replace(/ /g,'')) >= 0){
                                c_mag++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Manganese") == 0){
                        for(j=0; j< a_man.length; j++){
                            if(temp.indexOf(a_man[j].replace(/ /g,'')) >= 0){
                                c_man++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Niacin") == 0){
                        for(j=0; j< a_nia.length; j++){
                            if(temp.indexOf(a_nia[j].replace(/ /g,'')) >= 0){
                                c_nia++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("PantothenicAcid(B6)") == 0){
                        for(j=0; j< a_acid.length; j++){
                            if(temp.indexOf(a_acid[j].replace(/ /g,'')) >= 0){
                                c_acid++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Potassium") == 0){
                        for(j=0; j< a_pot.length; j++){
                            if(temp.indexOf(a_pot[j].replace(/ /g,'')) >= 0){
                                c_pot++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Pyridoxine(B6)") == 0){
                        for(j=0; j< a_pyr.length; j++){
                            if(temp.indexOf(a_pyr[j].replace(/ /g,'')) >= 0){
                                c_pyr++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Riboflavin") == 0){
                        for(j=0; j< a_ribo.length; j++){
                            if(temp.indexOf(a_ribo[j].replace(/ /g,'')) >= 0){
                                c_ribo++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Selenium") == 0){
                        for(j=0; j< a_sel.length; j++){
                            if(temp.indexOf(a_sel[j].replace(/ /g,'')) >= 0){
                                c_Sel++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Selenium") == 0){
                        for(j=0; j< a_sel.length; j++){
                            if(temp.indexOf(a_sel[j].replace(/ /g,'')) >= 0){
                                c_Sel++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("Thiamin") == 0){
                        for(j=0; j< a_thia.length; j++){
                            if(temp.indexOf(a_thia[j].replace(/ /g,'')) >= 0){
                                c_thia++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("VitaminA") == 0){
                        for(j=0; j< a_vita.length; j++){
                            if(temp.indexOf(a_vita[j].replace(/ /g,'')) >= 0){
                                c_vita++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("VitaminB-12") == 0){
                        for(j=0; j< a_vitb12.length; j++){
                            if(temp.indexOf(a_vitb12[j].replace(/ /g,'')) >= 0){
                                c_vitb12++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("VitaminC") == 0){
                        for(j=0; j< a_vitc.length; j++){
                            if(temp.indexOf(a_vitc[j].replace(/ /g,'')) >= 0){
                                c_vitc++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("CoQ10") == 0){
                        for(j=0; j< a_coq.length; j++){
                            if(temp.indexOf(a_coq[j].replace(/ /g,'')) >= 0){
                                c_coq++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("VitaminD") == 0){
                        for(j=0; j< a_vitd.length; j++){
                            if(temp.indexOf(a_vitd[j].replace(/ /g,'')) >= 0){
                                c_vitd++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("VitaminE") == 0){
                        for(j=0; j< a_vite.length; j++){
                            if(temp.indexOf(a_vite[j].replace(/ /g,'')) >= 0){
                                c_vite++;
                            }
                        }
                    }else if(array_positive[n].localeCompare("VitaminK") == 0){
                        for(j=0; j< a_vitk.length; j++){
                            if(temp.indexOf(a_vitk[j].replace(/ /g,'')) >= 0){
                                c_vitk++;
                            }
                        }
                    }
                    else{
                        //console.log("Here");
                        for(j=0; j< a_zinc.length; j++){
                            if(temp.indexOf(a_zinc[j].replace(/ /g,'')) >= 0){
                                c_zinc++;
                            }
                        }
                    }

                    
                
                }
              console.log("Biotin" , c_biotin);  
              console.log("Calcium" , c_cal);  
              console.log("Chromium", c_chrom);    
              console.log("Copper", c_copper);   
              console.log("Essential fatty acid", c_fatty);   
              console.log("Protein", c_protein);  
              console.log("Carbs", c_carbs);
              console.log("Folic Acid", c_folic);
              console.log("Iodine", c_ion);
              console.log("Iron", c_iron);
              console.log("Magnesium" , c_mag);
              console.log("Manganese" , c_man);
              console.log("Niacin" , c_nia);
              console.log("Pantothenic Acid(B6)", c_acid);
              console.log("Potassium", c_pot);
              console.log("Pyridoxine (B6)", c_pyr);
              console.log("Riboflavin", c_ribo);
              console.log("Selenium", c_Sel);
              console.log("Thiamin" , c_thia);
              console.log("Vitamin A" , c_vita);
              console.log("Vitamin B-12" , c_vitb12);
              console.log("Vitamin C" , c_vitc);
              console.log("CoQ10" , c_coq);
              console.log("Vitamin D" , c_vitd);
              console.log("Vitamin E" , c_vite);
              console.log("Vitamin K" , c_vitk);
              console.log("Zinc" , c_zinc);
            }
            //console.log(array_positive);    
              
        }
    });

}, function (reason) {
    // PDF loading error
    console.log("Error loading pdf");
    console.error(reason);
    
});