      
      // Specify the path to the worker
function myFunction(){

var PDF_URL = document.getElementById("uploadBox").files[0].path;

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
//var  file_name = document.getElementById("uploadBox").value ;



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
        for(i = 0; i <pagesText.length;i++){
            var s = pagesText[i];
            //Array of all elements
            var info = ["Name" , "Gender" , "Age" , "Contact Number" , "Height","Weight",  "BMI" , "Address","Color of Eyes" , "Email"];
            var section1 = ["(a)" , "(b)" , "(c)" , "(d)" , "(e)", "(f)", "(g)", "(h)"];
            var s1_p9 = ["(i)", "(j)", "(k)", "(l)"];
            var all = ["Biotin" , "Calcium" , "Chromium" , "Copper", "EssentialFattyAcids",
                        "Protein", "Carbohydrates", "FolicAcid", "Iodine" , "Iron" , "Magnesium","Manganese",
                        "Niacin", "PantothenicAcid(B6)" ,"Potassium", "Pyridoxine(B6)", "Riboflavin",
                        "Selenium","Thiamin", "VitaminA", "VitaminB-12",  "VitaminC", "CoQ10",
                        "VitaminD","VitaminE", "VitaminK","Zinc"] ;
            array_b = ["I." , "II." , "III." , "IV.","V.","VI.","VII.","VIII","IX","X.","XI.","XII."];
            var p_info = [];
            for(j = 0 ; j < info.length ; j++){
                if(s.indexOf(info[j]) >=0 ){
                    p_info.push(info[j]);
                }
            }

            if(p_info.length > 0){
                for(j = 0 ; j < p_info.length;j++){
                    if(j < p_info.length - 1){
                        var index1 = s.indexOf(p_info[j]);
                        var index2 = s.indexOf(p_info[j+1]);
                        var temp = s.substring(index1 , index2); 
                        
                    }else{ //last member of array
                        var index1 = s.indexOf(p_info[j]);
                        var index2;
                        for(j1 = 0; j1 < section1.length ; j1++){
                            index2 = s.indexOf(section1[j1]);
                            if(index2 >= 0){
                                break;
                            }
                        }
                        if(index2 < 0){
                            for(j1 = 0; j1 < s1_p9.length ; j1++){
                                index2 = s.indexOf(s1_p9[j1]);
                                
                                if(index2 >= 0){
                                    break;
                                }
                            }
                        }
                        if(index2 < 0){
                            for(j1 = 0; j1 < all.length ; j1++){
                                index2 = s.indexOf(all[j1]);
                                
                                if(index2 >= 0){
                                    break;
                                }
                            }
                        }
                        if(index2 < 0){
                          for( j1 = 0 ; j1 <array_b.length ; j1++){
                              index2 = s.indexOf(array_b[j1]);
                            
                              if(index2 >= 0){
                                  break;
                              }
                            }
                        }

                        if(index2 < 0){
                            index2 =  pagesText[i].length;
                        }

                        var temp = s.substring(index1, index2);
                    }
                    if(p_info[j].localeCompare("Name") == 0){
                        document.getElementById("name").value = temp.replace("Name" , "");
                    }else if(p_info[j].localeCompare("Gender") == 0){
                        if(temp.indexOf("F") >= 0){
                            document.getElementById("gender").value = "Female";
                        }else{
                            document.getElementById("gender").value = "Male";
                        }
                    }else if(p_info[j].localeCompare("Age") == 0){
                        document.getElementById("age").value = temp.replace("Age" , "");
                    }else if(p_info[j].localeCompare("Contact Number") == 0){
                        document.getElementById("contact").value = temp.replace("Contact Number" , "");
                    }else if(p_info[j].localeCompare("Height") == 0){
                        document.getElementById("height").value = temp.replace("Height" , "");
                    }else if(p_info[j].localeCompare("Weight") == 0){
                        document.getElementById("weight").value = temp.replace("Weight" , "");
                    }else if(p_info[j].localeCompare("BMI") == 0){
                        document.getElementById("bmi").value = temp.replace("BMI" , "");
                    }else if(p_info[j].localeCompare("Color of Eyes") == 0){
                        document.getElementById("eyes").value = temp.replace("Color of Eyes" , "");
                    }else if(p_info[j].localeCompare("Email") == 0){
                        document.getElementById("email").value = temp.replace("Email" , "");
                    }else{

                    }
                }

                
            }
            // Section I 
            s = pagesText[i].replace(/ /g,'')
            
            var array_p1= ["Fear" , "Anger" , "Bitterness" , "Grief", "Gossip", "Helplessness", "Hopelessness",
                            "Guilt", "Betrayal", "Envy" , "Jealousy","Insecurity","Impatient","Arrogance",
                            "Pride", "Hatred", "Rage", "Resentment", "Revenge", "Shame", "Sorrow", "Regret",
                            "Passivity", "Slander", "Possessiveness", "Rebellion", " Unforgiveness", "Gambling",
                            "Addictions" , "Other"];
            var array_p2 = ["Always Indoors", " DO not regularly change home filter", "Home has mold", "Home has an air ionizer",
                            "Have plenty of green plants in my living space", "Practice deep breathing exercises regularly, especially outdoors",
                            " I live away from city smog", " Dizziness", "Headaches", " WateryEyes", "Sneezing", "Cough Regularly",
                            "Fatigue", "Smoke cigarettes regularly"];
            var array_p3 = ["Dry mouth, dry eyes, dry nasal membranes", "Dry or leathery skin", "Dry or chapped lips",
                            "Stools hard & Dry", "Low volume of urine, urinate infrequently", "Dark urine (dark yellow or orange)",
                            "Poor skin turgor (loss of elasticity of skin)" , "Headaches", "Leg and arm cramps", "Weakness",
                            "Drink less than eight 8 ounce glasses of water daily" ];
            var array_p4 = ["Depression", "Poor Bone Health" , "Low Vitamin D levels", "Outdoors at least 30 minutes a day"];
            var array_p5 = ["Headaches","Nausea","Brain fog","Sleep disorders", "Loss of memory", "Sensitive skin", "Dizziness", 
                            "Burning sensation", "Rash", "Vision problems", "Chest pains" , "Swollen lymph nodes", "Live near electric towers",
                            "Teeth & jaw pain", "Constantly having cellphone to the ears","On computer more than six hours","Aching muscles",
                            "Fatigue","Bouts of unexplained fear or anxiety", "Tingling or prickly sensation across face or other parts of body",
                            "Feeling of impeding influenza but never quite breaks out"];
            var array_p6 = ["Exercise regularly at least twice a week", "Fatigue","Weight gain", "Weakness", "Muscle atrophy",
                            "Depression", "Lack of flexibility and good balance",  "Heart problems" ];
            var array_p7 = ["Painful or hard bowel movements", "Constipated, less than 1 bowel movement a day", "Varicose veins",
                            "Hemorrhoids or rectal fissures", "Use lots of toilet paper to clean yourself",
                            "Stools are pencil size and drop to the bottom of the toilet"  ];
            var array_p8 =["Consume six types of vegetables daily", "Eat at least two types of fruit daily", "Consume at least an ounce of raw nuts daily",
                            "50% of my diet is made up of raw foods", "I do not consume dairy, wheat or gluten containing foods",
                            "I consume very little dairy or gluten (2 to 3 meals a week)", "Eat fresh and/or organic foods as much as possible",
                            "Vegetarian", "Vegan", "Eat white fish two to three times a week" ];
            var array_p9a = ["Allergies" , "Chronic Headaches/migraines" , "Chronic skin problems",  "Digestive problems",  "Diabetes" , "Autoimmune disease",  "Difficulty sleeping",  
                            "Depression/poor mood" , "Low energy" , "Liver dysfunction" , "Overweight" , "Sore muscles or stiff joints" , "Unhealthy cravings" , "Chemical sensitivities/Environmental illness",  
                            "Sleepy after meals" , "Food Allergies"];
            var array_p9b = ["High Blood Pressure",  "Numbness and tingling in extremity" , "Twitching of face and other muscles",  "Tremors or shakes of hands, feet, head, etc.",  "Jumpy, jittery, nervous",  
                            "Unexplained chest pains",  "Heartbeat over 100 per minute" , "Unexplained rashes or skin irritations",  "Excessive itching",  "Bloated feeling most of the time",  "Frequent or re-occurring heartburn",  
                            "Constipated on regular basis" , "Frequent diarrhea" , "Depression" , "Unexplained irritability" , "Sudden, unexplained or unsolicited anger",  "Constant death wish or suicidal intent",  
                            "Difficulty in making simple decisions" , "Cold hands or feet, even in warm or moderate weather" , "Out of breath easily" , "Headaches after eating" , "Frequent leg cramps",  
                            "Frequent metallic taste in mouth" , "Burning sensation on the tongue" , "Constant or frequent ringing in the ears" , "Frequent urination during the night" , "Unexplained chronic fatigue" , 
                            "Poor or failing memory" , "Constant or frequent pain in joins" , "Frequent insomnia ", "Unexplained fluid retention"];
            var array_p10 = ["Gas" , "Bloating" , "Abdominal fullness" , "Nausea" , "Constipation" , "Diarrhea" , "Abdominal cramps or pain" , "Fatigue" , "Hives" , "Allergies, especially foods" , "History of parasitic infections" , 
                            "History of traveler's diarrhea" , "Difficulty overcoming intestinal yeast growth"];
            var array_p11 = ["Gas" , "Bloating" , "Constipation and/or diarrhea" , "Spastic/irritable colon" , "Chron's Disease, Colitis" , "Intestinal cramping" , "Heart Burn" , "Itchy anus" , 
                            "Continuous sinus problems" , "Chronic or re-occurring sore throat, colds, bronchitis, ear infection",  "Premenstrual symptoms" , "Menstrual cramps and problems" , "Fatigue" ,
                            "Depression" , "Irritability or chronic vaginal yeast infections" , "Infertility" , "Chronic rashes",  "Recurrent bladder infections or irritation" , "Recurrent staph infections" ,
                            "Itchy ears or ringing in the ears" , "General itching" , "Multiple allergies" , "Weight problems",  "Craving for sweets, alcohol, bread, cheese" , "Feel drunk without having ingested alcohol" ,
                             "Chemical and fume intolerance" , "Worsening of any of the above symptoms within six to twelve months after a pregnancy",  
                            "Multiple pregnancies" , "Antibiotic use" , "Birth control pill (oral contraceptives) use" , "Cortisone or steroid use" , "Chemotherpy or radiation therpy"];
            var s1 = [];
            var count_a = 0;
            var count_b = 0;
            var count_c = 0;
            var count_d = 0;
            var count_e = 0;
            var count_f = 0;
            var count_g = 0;
            var count_h = 0;
            var count_i = 0;
            var count_j = 0;
            var count_k = 0;
            var c_iron = 0;
            
            for(k=0; k<section1.length;k++){
                if(s.indexOf(section1[k]) >= 0 ){
                    s1.push(section1[k].replace(/ /g,''));
                }
            }
            if(s1.length > 0){
                for(n = 0; n<s1.length ; n++){
                    
                    if(n < (s1.length - 1)){
                          var index1 = s.indexOf(s1[n]);
                          var index2 = s.indexOf(s1[n+1]);
                          var temp = s.substring(index1 , index2); 
                    }else{ //last member of array
                          var index1 = s.indexOf(s1[n]);
                          var index2;
                      
                            for(j1 = 0; j1 < s1_p9.length ; j1++){
                                index2 = s.indexOf(s1_p9[j1]);
                                
                                if(index2 >= 0){
                                    break;
                                }
                            }

                        if(index2 < 0){
                            for(j1 = 0; j1 < all.length ; j1++){
                                index2 = s.indexOf(all[j1]);
                                
                                if(index2 >= 0){
                                    break;
                                }
                            }
                        }
                        if(index2 < 0){
                          for( j1 = 0 ; j1 <array_b.length ; j1++){
                              index2 = s.indexOf(array_b[j1]);
                            
                              if(index2 >= 0){
                                  break;
                              }
                            }
                        }

                        if(index2 < 0){
                            index2 =  pagesText[i].length;
                        }

                        var temp = s.substring(index1, index2);
                    }

                    if(s1[n].localeCompare("(a)") == 0){
                        for(j=0; j< array_p1.length; j++){
                            if(temp.indexOf(array_p1[j].replace(/ /g,'')) >= 0){
                                count_a++;
                            }
                        }        
                        document.getElementById("part1").value = count_a;
                        if(count_a >= 1 & count_a <= 4){
                            document.getElementById("p_part1").value = "Low";
                        }else if(count_a >= 5 & count_a <=7){
                            document.getElementById("p_part1").value = "Medium";
                        }else{
                            document.getElementById("p_part1").value = "High";
                        }
                    }else if(s1[n].localeCompare("(b)") == 0){
                        for(j=0; j< array_p2.length; j++){
                            if(temp.indexOf(array_p2[j].replace(/ /g,'')) >= 0){
                                count_b++;
                            }
                        }        
                        document.getElementById("part2").value = count_b;
                        if(count_b >= 1 & count_b <= 2){
                            document.getElementById("p_part2").value = "Low";
                        }else if(count_b >= 3 & count_b <=5){
                            document.getElementById("p_part2").value = "Medium";
                        }else{
                            document.getElementById("p_part2").value = "High";
                        }
                    }else if(s1[n].localeCompare("(c)") == 0){
                        for(j=0; j< array_p3.length; j++){
                            if(temp.indexOf(array_p3[j].replace(/ /g,'')) >= 0){
                                count_c++;
                            }
                        }        
                        document.getElementById("part3").value = count_c;
                        if(count_c >= 1 & count_c <= 2){
                            document.getElementById("p_part3").value = "Low";
                        }else if(count_c >= 3 & count_c <=5){
                            document.getElementById("p_part3").value = "Medium";
                        }else{
                            document.getElementById("p_part3").value = "High";
                        }
                    }else if(s1[n].localeCompare("(d)") == 0){
                        for(j=0; j< array_p4.length; j++){
                            if(temp.indexOf(array_p4[j].replace(/ /g,'')) >= 0){
                                count_d++;
                            }
                        }        
                        document.getElementById("part4").value = count_d;    
                        if(count_d == 1){
                            document.getElementById("p_part4").value = "Low";
                        }else if(count_d == 2){
                            document.getElementById("p_part4").value = "Medium";
                        }else{
                            document.getElementById("p_part4").value = "High";
                        }
                    }else if(s1[n].localeCompare("(e)") == 0){
                        for(j=0; j< array_p5.length; j++){
                            if(temp.indexOf(array_p5[j].replace(/ /g,'')) >= 0){
                                count_e++;
                            }
                        } 
                        document.getElementById("part5").value = count_e;     
                        if(count_e >= 1 & count_e <= 4){
                            document.getElementById("p_part5").value = "Low";
                        }else if(count_e >= 5 & count_e <=10){
                            document.getElementById("p_part5").value = "Medium";
                        }else{
                            document.getElementById("p_part5").value = "High";
                        }  
                    }else if(s1[n].localeCompare("(f)") == 0){
                        for(j=0; j< array_p6.length; j++){
                            if(temp.indexOf(array_p6[j].replace(/ /g,'')) >= 0){
                                count_f++;
                            }
                        }        
                        document.getElementById("part6").value = count_f;
                        if(count_f >= 1 & count_f <= 2){
                            document.getElementById("p_part6").value = "Low";
                        }else if(count_f >= 3 & count_f <=4){
                            document.getElementById("p_part6").value = "Medium";
                        }else{
                            document.getElementById("p_part6").value = "High";
                        }
                    }else if(s1[n].localeCompare("(g)") == 0){
                        for(j=0; j< array_p7.length; j++){
                            if(temp.indexOf(array_p7[j].replace(/ /g,'')) >= 0){
                                count_g++;
                            }
                        } 
                        document.getElementById("part7").value = count_g;       
                        if(count_g == 1){
                            document.getElementById("p_part7").value = "Low";
                        }else if(count_g >= 2 & count_g <=3){
                            document.getElementById("p_part7").value = "Medium";
                        }else{
                            document.getElementById("p_part7").value = "High";
                        }
                    }else if(s1[n].localeCompare("(h)") == 0){
                        for(j=0; j< array_p8.length; j++){
                            if(temp.indexOf(array_p8[j].replace(/ /g,'')) >= 0){
                                count_h++;
                            }
                        }   
                        document.getElementById("part8").value = count_h;     
                        if(count_h >= 1 & count_h <= 2){
                            document.getElementById("p_part8").value = "Low";
                        }else if(count_h >= 5 & count_h <=4){
                            document.getElementById("p_part8").value = "Medium";
                        }else{
                            document.getElementById("p_part8").value = "High";
                        }
                    }else{

                    }
                }
          }

              var pos_9 = [];
            
            for(k=0; k<s1_p9.length;k++){
                if(s.indexOf(s1_p9[k]) >= 0 ){
                    pos_9.push(s1_p9[k].replace(/ /g,''));
                }
            }

            if(pos_9.length > 0){
                for(n = 0; n<pos_9.length ; n++){                  
                    if(n < (pos_9.length - 1)){
                          var index1 = s.indexOf(pos_9[n]);
                          var index2 = s.indexOf(pos_9[n+1]);
                          var temp = s.substring(index1 , index2); 
                    }else{ //last member of array
                          var index1 = s.indexOf(pos_9[n]);
                          var index2 ;
                          for(j = 0; j < all.length ; j++){
                              index2 = s.indexOf(all[j]);
                              
                              if(index2 >= 0){
                                  break;
                              }
                          }
                          if(index2 < 0){
                            for( j = 0 ; j <array_b.length ; j++){
                                index2 = s.indexOf(array_b[j]);
                              
                                if(index2 >= 0){
                                    break;
                                }
                              }
                          }

                          if(index2 < 0){
                            index2 =  pagesText[i].length;
                          }
                          var temp = s.substring(index1, index2);
                         
                    }

                    if(pos_9[n].localeCompare("(i)") == 0){
                        for(j=0; j< array_p9a.length; j++){
                            if(temp.indexOf(array_p9a[j].replace(/ /g,'')) >= 0){
                                count_i++;
                            }
                        }
                        document.getElementById("part9a").value = count_i;        
                        if(count_i >= 1 & count_i <= 4){
                            document.getElementById("p_part9a").value = "Low";
                        }else if(count_i >= 5 & count_i <=8){
                            document.getElementById("p_part9a").value = "Medium";
                        }else{
                            document.getElementById("p_part9a").value = "High";
                        }
                    }else if(pos_9[n].localeCompare("(j)") == 0){
                        for(j=0; j< array_p9b.length; j++){
                            if(temp.indexOf(array_p9b[j].replace(/ /g,'')) >= 0){
                                count_j++;
                            }
                        }   
                        document.getElementById("part9b").value = count_j;   
                        if(count_j >= 1 & count_j <= 8){
                            document.getElementById("p_part9b").value = "Low";
                        }else if(count_j >= 9 & count_j <=15){
                            document.getElementById("p_part9b").value = "Medium";
                        }else{
                            document.getElementById("p_part9b").value = "High";
                        }  
                    }else if(pos_9[n].localeCompare("(k)") == 0){
                        for(j=0; j< array_p10.length; j++){
                            if(temp.indexOf(array_p10[j].replace(/ /g,'')) >= 0){
                                count_k++;
                            }
                        }    
                        document.getElementById("part10").value = count_k;  
                        if(count_k >= 1 & count_k <= 3){
                            document.getElementById("p_part10").value = "Low";
                        }else if(count_k >= 4 & count_k <= 6){
                            document.getElementById("p_part10").value = "Medium";
                        }else{
                            document.getElementById("p_part10").value = "High";
                        }  
                    }else if(pos_9[n].localeCompare("(l)") == 0){
                        for(j=0; j< array_p11.length; j++){
                            if(temp.indexOf(array_p11[j].replace(/ /g,'')) >= 0){
                                c_iron++;
                            }
                        }  
                        document.getElementById("iron").value = c_iron;   
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        }   
                    }else{

                    }
                }
                               
            }

            //Array of all the sympots
            var a_biotin =["Dermatitis", "Eye inflammation", "Hair loss", "Loss of muscle control", "Insomnia", "Muscle weakness"];
            var a_cal = ["Brittle nails", "Cramps", "Delusions", "Depression", "Insomnia", "Irritability", 
                        "Osteoporosis", "Palpitations", "Periodontal disease", "Rickets", "Tooth decay"];
            var a_chrom = ["Anxiety", "Fatigue", "Glucose intolerance", "Adult-onset diabetes"];
            var a_copper = ["Anemia", "Arterial Damage", "Depression", "Diarrhea", "Fatigue", "Fragile Bones", "Hair Loss", "Hyperthyroidism", "Weakness"];
            var a_fatty = ["Diarrhea", "Dry Skin & Hair loss","Hair Loss", "Immune Impairment", "Infertility", 
                            "Poor Wound Healing", "Premenstrual Syndrome", "Acne", "Eczema", "Gall Stones", "Liver Degeneration", 
                            "Headaches when out in the hot sun", "Sunburn easily or suffer sun poisoning"];
            var a_protein = ["Increased secretion from mouth/nose/eyes", "Swelling in hands and feet", "Muscle cramps", 
                            "Menstrual cramps", "Low Exercise Tolerance", "Cold hands and feet", "Bleeding Gums", "Low Immunity", 
                            "Fatigue", "Muscles more flabby than normal", "Hair loss", "Splitting hair and nails", "Low Heart Rate", "Hypoglycemia"];
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
                         "Neurological Symptoms (Numbness/Loss Of Sensation/\"Electic Shock\" Sensations)", "Seizures", "Sensitivity to Light", "Sleepiness", "Weakness"];
            var a_sel = ["Growth Impairment", "High Cholesterol Levels", "Increased Incidence of Cancer", "Pancreatic Insufficiency (Inability to secrete adequate amounts of digestive enzymes)", 
                        "Immune Impairment", "Liver Impairment", "Male Sterility"];
            var a_thia = ["Confusion", "Constipated", "Digestive Problems", "Irritability", "Loss of Appetite", "Memory Loss", "Nervousness", "Numbness of Hands & Feet", "Pain Sensitivity", 
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
                if(s.indexOf(all[k]) >= 0 ){
                    array_positive.push(all[k].replace(/ /g,''));
                }
            }
            if(array_positive.length > 0){
                for(n = 0; n<array_positive.length ; n++){
                    
                    if(n < (array_positive.length - 1)){
                          var index1 = s.indexOf(array_positive[n]);
                          var index2 = s.indexOf(array_positive[n+1]);
                          var temp = s.substring(index1 , index2); 
                    }else{ //last member of array
                          var index1 = s.indexOf(array_positive[n]);
                          var index2;
                          for( j1 = 0 ; j1 <array_b.length ; j1++){
                              index2 = s.indexOf(array_b[j1]);
                            
                              if(index2 >= 0){
                                  break;
                              }
                            }
                        if(index2 < 0){
                            index2 =  pagesText[i].length;
                        }
                        var temp = s.substring(index1, index2);
                    }

                    if(array_positive[n].localeCompare("Biotin") == 0){
                        for(j=0; j< a_biotin.length; j++){
                            if(temp.indexOf(a_biotin[j].replace(/ /g,'')) >= 0){
                                c_biotin++;
                            }
                        }       
                        document.getElementById("biotin").value = c_biotin;   
                        if(c_biotin ==1 ){
                            document.getElementById("p_biotin").value = "Low";
                        }else if(c_biotin >= 2 & c_biotin <= 3){
                            document.getElementById("p_biotin").value = "Medium";
                        }else{
                            document.getElementById("p_biotin").value = "High";
                        }            
                    }else if(array_positive[n].localeCompare("Calcium") == 0){
                        for(j=0; j< a_cal.length; j++){
                            if(temp.indexOf(a_cal[j].replace(/ /g,'')) >= 0){
                                c_cal++;
                            }
                        }
                        document.getElementById("calc").value = c_cal;
                        if(c_cal>= 1 & c_cal <= 3){
                            document.getElementById("p_calc").value = "Low";
                        }else if(c_cal >= 4 &c_cal<=5){
                            document.getElementById("p_calc").value = "Medium";
                        }else{
                            document.getElementById("p_calc").value = "High";
                        }  
                    }else if(array_positive[n].localeCompare("Chromium") == 0){
                        for(j=0; j< a_chrom.length; j++){
                            if(temp.indexOf(a_chrom[j].replace(/ /g,'')) >= 0){
                                c_chrom++;
                            }
                        }
                        document.getElementById("chrom").value = c_chrom; 
                        if(c_chrom == 1){
                            document.getElementById("p_chrom").value = "Low";
                        }else if(c_chrom == 2){
                            document.getElementById("p_chrom").value = "Medium";
                        }else{
                            document.getElementById("p_chrom").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Copper") == 0){
                        for(j=0; j< a_copper.length; j++){
                            if(temp.indexOf(a_copper[j].replace(/ /g,'')) >= 0){
                                c_copper++;
                            }
                        }
                        document.getElementById("copper").value = c_copper;
                        if(c_copper >= 1 & c_copper <= 2){
                            document.getElementById("p_copper").value = "Low";
                        }else if(c_copper >= 3 & c_copper <= 4){
                            document.getElementById("p_copper").value = "Medium";
                        }else{
                            document.getElementById("p_copper").value = "High";
                        }  
                    }else if(array_positive[n].localeCompare("EssentialFattyAcids") == 0){
                        for(j=0; j< a_fatty.length; j++){
                            if(temp.indexOf(a_fatty[j].replace(/ /g,'')) >= 0){
                                c_fatty++;
                            }
                        }
                        document.getElementById("fattyacid").value = c_fatty; 
                        if( c_fatty >= 1 &  c_fatty <= 3){
                            document.getElementById("p_fattyacid").value = "Low";
                        }else if( c_fatty >= 4 &  c_fatty <= 6){
                            document.getElementById("p_fattyacid").value = "Medium";
                        }else{
                            document.getElementById("p_fattyacid").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Protein") == 0){
                        for(j=0; j< a_protein.length; j++){
                            if(temp.indexOf(a_protein[j].replace(/ /g,'')) >= 0){
                                c_protein++;
                            }
                        }
                        document.getElementById("protein").value = c_protein; 
                        if(c_protein >= 1 & c_protein <= 4){
                            document.getElementById("p_protein").value = "Low";
                        }else if(c_protein >= 5 &c_protein<=7){
                            document.getElementById("p_protein").value = "Medium";
                        }else{
                            document.getElementById("p_protein").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Carbohydrates") == 0){
                        for(j=0; j< a_carbs.length; j++){
                            if(temp.indexOf(a_carbs[j].replace(/ /g,'')) >= 0){
                                c_carbs++;
                            }
                        }
                        document.getElementById("carbs").value = c_carbs; 
                        if(c_carbs == 1){
                            document.getElementById("p_carbs").value = "Low";
                        }else if(c_carbs >= 2 & c_carbs<=3){
                            document.getElementById("p_carbs").value = "Medium";
                        }else{
                            document.getElementById("p_carbs").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("FolicAcid") == 0){
                        for(j=0; j< a_folic.length; j++){
                            if(temp.indexOf(a_folic[j].replace(/ /g,'')) >= 0){
                                c_folic++;
                            }
                        }
                        document.getElementById("folic").value = c_folic; 
                        if( c_folic >= 1 &  c_folic <= 3){
                            document.getElementById("p_folic").value = "Low";
                        }else if( c_folic >= 4 &  c_folic <= 5){
                            document.getElementById("p_folic").value = "Medium";
                        }else{
                            document.getElementById("p_folic").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Iodine") == 0){
                        for(j=0; j< a_ion.length; j++){
                            if(temp.indexOf(a_ion[j].replace(/ /g,'')) >= 0){
                                c_ion++;
                            }
                        }
                        document.getElementById("iodine").value = c_ion; 
                        if(c_ion == 1){
                            document.getElementById("p_iodine").value = "Low";
                        }else if(c_ion == 2){
                            document.getElementById("p_iodine").value = "Medium";
                        }else{
                            document.getElementById("p_iodine").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Iron") == 0){
                        for(j=0; j< a_iron.length; j++){
                            if(temp.indexOf(a_iron[j].replace(/ /g,'')) >= 0){
                                c_iron++;
                            }
                        }
                        document.getElementById("iron").value = c_iron; 
                        if(c_iron >= 1 & c_iron <= 2){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 3 & c_iron <= 5){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Magnesium") == 0){
                        for(j=0; j< a_mag.length; j++){
                            if(temp.indexOf(a_mag[j].replace(/ /g,'')) >= 0){
                                c_mag++;
                            }
                        }
                        document.getElementById("mag").value = c_mag; 
                        if(c_mag >= 1 & c_mag <= 2){
                            document.getElementById("p_mag").value = "Low";
                        }else if(c_mag >= 3 & c_mag <= 5){
                            document.getElementById("p_mag").value = "Medium";
                        }else{
                            document.getElementById("p_mag").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Manganese") == 0){
                        for(j=0; j< a_man.length; j++){
                            if(temp.indexOf(a_man[j].replace(/ /g,'')) >= 0){
                                c_man++;
                            }
                        }
                        document.getElementById("mana").value = c_man; 
                        if(c_man == 1){
                            document.getElementById("p_mana").value = "Low";
                        }else if(c_man >= 2 & c_man <= 3){
                            document.getElementById("p_mana").value = "Medium";
                        }else{
                            document.getElementById("p_mana").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Niacin") == 0){
                        for(j=0; j< a_nia.length; j++){
                            if(temp.indexOf(a_nia[j].replace(/ /g,'')) >= 0){
                                c_nia++;
                            }
                        }
                        document.getElementById("nia").value = c_nia;  
                        if(c_nia >= 1 & c_nia <= 4){
                            document.getElementById("p_nia").value = "Low";
                        }else if(c_nia >= 5 & c_nia <= 8){
                            document.getElementById("p_nia").value = "Medium";
                        }else{
                            document.getElementById("p_nia").value = "High";
                        }                      
                    }else if(array_positive[n].localeCompare("PantothenicAcid(B6)") == 0){
                        for(j=0; j< a_acid.length; j++){
                            if(temp.indexOf(a_acid[j].replace(/ /g,'')) >= 0){
                                c_acid++;
                            }
                        }
                        document.getElementById("pana").value = c_acid; 
                        if(c_acid >= 1 & c_acid <= 3){
                            document.getElementById("p_pana").value = "Low";
                        }else if(c_acid>= 4 & c_acid<= 6){
                            document.getElementById("p_pana").value = "Medium";
                        }else{
                            document.getElementById("p_pana").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Potassium") == 0){
                        for(j=0; j< a_pot.length; j++){
                            if(temp.indexOf(a_pot[j].replace(/ /g,'')) >= 0){
                                c_pot++;
                            }
                        }
                        document.getElementById("pot").value = c_pot; 
                        if(c_pot >= 1 & c_pot <= 4){
                            document.getElementById("p_pot").value = "Low";
                        }else if(c_pot >= 5 & c_pot <= 7){
                            document.getElementById("p_pot").value = "Medium";
                        }else{
                            document.getElementById("p_pot").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Pyridoxine(B6)") == 0){
                        for(j=0; j< a_pyr.length; j++){
                            if(temp.indexOf(a_pyr[j].replace(/ /g,'')) >= 0){
                                c_pyr++;
                            }
                        }
                        document.getElementById("b6").value = c_pyr; 
                        if(c_pyr >= 1 & c_pyr <= 4){
                            document.getElementById("p_b6").value = "Low";
                        }else if(c_pyr >= 5 & c_pyr <= 7){
                            document.getElementById("p_b6").value = "Medium";
                        }else{
                            document.getElementById("p_b6").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Riboflavin") == 0){
                        for(j=0; j< a_ribo.length; j++){
                            if(temp.indexOf(a_ribo[j].replace(/ /g,'')) >= 0){
                                c_ribo++;
                            }
                        }
                        document.getElementById("ribo").value = c_ribo; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("Selenium") == 0){
                        for(j=0; j< a_sel.length; j++){
                            if(temp.indexOf(a_sel[j].replace(/ /g,'')) >= 0){
                                c_Sel++;
                            }
                        }
                        document.getElementById("sel").value = c_Sel;
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        }  
                    }else if(array_positive[n].localeCompare("Thiamin") == 0){
                        for(j=0; j< a_thia.length; j++){
                            if(temp.indexOf(a_thia[j].replace(/ /g,'')) >= 0){
                                c_thia++;
                            }
                        }
                        document.getElementById("thia").value = c_thia; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("VitaminA") == 0){
                        for(j=0; j< a_vita.length; j++){
                            if(temp.indexOf(a_vita[j].replace(/ /g,'')) >= 0){
                                c_vita++;
                            }
                        }
                        document.getElementById("vita").value = c_vita; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("VitaminB-12") == 0){
                        for(j=0; j< a_vitb12.length; j++){
                            if(temp.indexOf(a_vitb12[j].replace(/ /g,'')) >= 0){
                                c_vitb12++;
                            }
                        }
                        document.getElementById("vitb12").value = c_vitb12; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("VitaminC") == 0){
                        for(j=0; j< a_vitc.length; j++){
                            if(temp.indexOf(a_vitc[j].replace(/ /g,'')) >= 0){
                                c_vitc++;
                            }
                        }
                        document.getElementById("vitc").value = c_vitc; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("CoQ10") == 0){
                        for(j=0; j< a_coq.length; j++){
                            if(temp.indexOf(a_coq[j].replace(/ /g,'')) >= 0){
                                c_coq++;
                            }
                        }
                        document.getElementById("coq").value = c_coq;
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        }  
                    }else if(array_positive[n].localeCompare("VitaminD") == 0){
                        for(j=0; j< a_vitd.length; j++){
                            if(temp.indexOf(a_vitd[j].replace(/ /g,'')) >= 0){
                                c_vitd++;
                            }
                        }
                        document.getElementById("vitd").value = c_vitd; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("VitaminE") == 0){
                        for(j=0; j< a_vite.length; j++){
                            if(temp.indexOf(a_vite[j].replace(/ /g,'')) >= 0){
                                c_vite++;
                            }
                        }
                        document.getElementById("vite").value = c_vite;
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }else if(array_positive[n].localeCompare("VitaminK") == 0){
                        for(j=0; j< a_vitk.length; j++){
                            if(temp.indexOf(a_vitk[j].replace(/ /g,'')) >= 0){
                                c_vitk++;
                            }
                        }
                        document.getElementById("vitk").value = c_vitk; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }
                    else{
                        for(j=0; j< a_zinc.length; j++){
                            if(temp.indexOf(a_zinc[j].replace(/ /g,'')) >= 0){
                                c_zinc++;
                            }
                        }
                        document.getElementById("zinc").value = c_zinc; 
                        if(c_iron >= 1 & c_iron <= 9){
                            document.getElementById("p_iron").value = "Low";
                        }else if(c_iron >= 10 & c_iron <=17){
                            document.getElementById("p_iron").value = "Medium";
                        }else{
                            document.getElementById("p_iron").value = "High";
                        } 
                    }               
                }
           }

            a_i = ["Belching or gas within one hour after eating" , "Heartburn or acid reflux", "Bad breath", "Bloated within one hour after eating", "Loss of taste for meat",
                   "Sweat has strong odor", "Stomach upset by taking vitamins", "Feel like skipping breakfast", "Sleepy after meals", "Feel better if you do not eat", 
                   "Fingernails chip, peel or break easily" ,  "Anemia unresponsive to iron", "Stomach pains or cramps", "Chronic Diarrhea", "Diarrhea shortly after meals",
                    "Black or tarry colored tools","Undigested food in stool"];
            a_ii= ["Pain between shoulder blades", "History of morning sickness","Bitter taste in mouth, especially after meals", "I am a recovering alcoholic", "Sensitive to tobacco smoke",
                    "Sensitive to Nutrasweet (aspartame)","Stomach upset by greasy foods", "Light or clay colored stools", "Become sick if you drink wine", " History of drug or alcohol abuse",
                     "Pain under right side of rib cage", "Greasy or shinny stools",  "Dry skin, itchy feet or skin peels on feet", "Easily intoxicated if you drink wine"," History of Hepatitis",
                      "Hemorrhoids or varicose veins", "Nausea", "Headache over eyes" , "Easily hung over if you drink wine", "Long term use of prescription or recreational drugs",
                      "Chronic fatigue or fibromyalgia", "Sea, car, airplane or motion sickness", "Gallbladder attack or removed", 
                     "How much alcohol do you drink per week?", "Sensitive to chemicals","Nutrasweet consumption" ];
            a_iii = ["Food Allergies" ,"Abdominal bloating 1 to 2 hours after eating" , "Pulse speeds after eating", "Specific foods make you tired or burdened" ,"Airborne allergies" ,
                    "Experience hives" ,"Sinus congestion" , "Crave bread or noodles",  "Alternating constipation and diarrhea",  "Crohn’s disease" , "Wheat or grain sensitivity" , 
                    "Asthma, sinus infections, stuffy nose" , "Dairy sensitivity",  "Bizarre, vivid dreams, nightmares" , "Feel spacy or unreal" , "Use over the counter pain medications"];
            a_iv = ["Anus itches",  "Coated tongue",  "Feel worse in moldy or dusty places", "Have taken antibiotics for long periods (2 to 3 months or more)",  "Fungus or yeast infection",
                   "Ringworm/Nail fungus",  "Blood in stool" ," Mucous in stool" , "Painful to press on outer side of thighs" , "Cramping in lower abdominal region" , "Dark circles under eyes",
                    "Excessive foul smelling lower bowel gas",  "Irritable bowel or mucous colitis",  "Strong body odors",  "Less than 1 bowel movement daily"];
            a_v = ["Awaken a few hours after falling asleep, hard to get back to sleep",  "Crave Sweets",  "Bing or uncontrolled eating",  "Excessive appetite",  "Crave coffee or sugar in afternoon"
                  , "Sleepy in the afternoon",  "Fatigue that is relieved by eating", "Headaches if meals are skipped",  "Irritable before meals",  "Shaky if meals are delayed",
                  "Family members with diabetes",  "Frequent thirst",  "Frequent Urination"];
            a_vi = ["Tend to be a night person",  "Difficulty falling asleep",  "Slow starter in the morning",  "Keyed up, trouble calming down", "Blood pressure above 120/80",
                    "A headache after exercising",  "Feeling wired or jittery after drinking coffee",  "Clench or grind teeth" ,"Calm on the outside, trouble on the inside",
                    "Chronic low back pain, worse with fatigue",  "Become dizzy when standing up suddenly",  "Difficulty maintaining manipulative correction" ,
                    "Pain after manipulative correction",  "Arthritic tendencies",  "Crave salty foods",  "Salt foods before tasting",  "Perspire easily",  
                    "Chronic fatigue or get drowsy often",  "Afternoon yawning",  "After headaches",  "Asthma, wheezing or difficulty breathing",  "Pain on the medial or inner side of the knee" ,
                     "Tendency to sprain ankles or shin splints" , "Tendency to need sunglasses",  "Allergies and/or hives", "Weakness, dizziness"];
            a_vii = ["Sensitive/allergic to iodine",  "Difficulty gaining weight, even with large appetite",  "Nervous, emotional, can’t work under pressure",  "Inward trembling",  "Flush easily" ,
                    "Fast pulse at rest" , "Intolerant of high temperatures",  "Difficulty losing weight" , "Mentally sluggish, reduced initiative",  "Easily fatigued, sleepy during the day" ,
                     "Sensitive to cold, poor circulation (cold hands and feet)",  "Chronic constipation",  "Excessive hair loss and/or coarse hair",  "Morning headaches, wear off during the day",
                    "Seasonal sadness",  "Loss of lateral 1/3 of eyebrow"];
            a_viii = ["Prostate problems",  "Difficulty with urination or dribbling",  "Difficult to start or stop urine stream" , "Pain or burning during urination",  "Waking to urinate at night", 
                    "Interruption of stream during urination",  "Pain on inside of legs or heels",  "Feeling of incomplete bowel evacuation",  "Decreased sexual function"];
            a_ix = ["Depression during periods",  "Mood swings associated with periods (PMS)" ,"Crave chocolate around period",  "Breast tenderness associated with cycle" ,"Excessive menstrual flow",
                    "Scanty blood flow during periods",  "Occasional skipped periods",  "Variations in menstrual cycle",  "Endometriosis",  "Uterine fibroids",  "Breast fibroids, benign masses",  
                    "Painful intercourse",  "Vaginal discharge",  "Vaginal itchiness",  "Vaginal dryness",  "Weight gain around hips, thighs, and buttocks",  "Excessive facial or body hair",  
                    "Thinning skin", "Hotflashes",  "Night sweats (in menopausal women)"];
            a_x = ["Aware of heavy or irregular breathing",  "Discomfort at high altitudes" , "Air hunger or sigh frequently",  "Compelled to open windows in a closed room",  "Shortness of breath with moderate exertion", 
                   "Ankles swell, especially at end of day",  "Cough at night", "Blush or face turns red for no reason",  "Muscle cramps with exertion",  "Cold hands and feet , even in the warm season",
                    "Dull pain or tightness in chest and/or radiate into right arm, worse with exertion",  "Numbness in certain parts of the body",  "Dry skin despite regular consumption of water",  "Frequent dizziness",  
                    "Memory loss",  "Lack of energy or frequent exhaustion" , "Skin discoloration blemishes, or spots",  "Weakened immune system",  "Unexplained digestive problems", "Low libido (sex drive)",  
                    "Decreased cognitive ability",  "Brittle hair and nails",  "Hair loss",  "Headaches", "Dark circles under eyes",  "Problems with sleep",  "Chronic pain or muscular and joint stiffness",  
                    "Problems with leg ulcers or bed sores",  "Varicose veins"];
            a_xi = ["Pain in mid-back region",  "Puffy around the eyes, dark circles under eyes" , "History of kidney stones",  "Cloudy, bloody or darkened urine",  "Urine has a strong odor"];
            a_xii = ["Runny or drippy nose",  "Catch colds at the beginning of winter",  "Adult acne" , "Itchy skin",  "Cysts, boils, rashes",  "History of Epstein Bar",  "Frequent colds or flu",
                      "Frequent infections",  "Mucous-producing cough",  "History of Mono, Herpes",  "History of Shingles, Chronic fatigue, Hepatitis or other chronic viral condition"];
            b_pos = [];

            var c_i = 0;
            var c_ii = 0;
            var c_iii = 0;
            var c_iv = 0;
            var c_v = 0;
            var c_vi = 0;
            var c_vii = 0;
            var c_viii = 0;
            var c_ix = 0;
            var c_x = 0;
            var c_xi = 0;
            var c_xii = 0;

            for(k=0;k<array_b.length;k++){
                if(s.indexOf(array_b[k]) >= 0){
                    b_pos.push(array_b[k].replace(/ /g,''));
                }
            }

            if(b_pos.length > 0){
                for(x = 0 ; x < b_pos.length ; x++){

                    if(x < (b_pos.length - 1)){
                        var index1 = s.indexOf(b_pos[x]);
                        var index2 = s.indexOf(b_pos[x+1]);
                        if(index2 - index1 > 1){
                            var temp = s.substring(index1 , index2); 
                        }else{
                            index2 = s.lastIndexOf(b_pos[x+1]);
                            var temp = s.substring(index1 , index2); 
                        }
                    }else{ //last member of array
                        var index1 = s.indexOf(b_pos[x]);
                        var index2 = s.indexOf("List"); 
                        if(index2 <0){
                          var temp = s.substring(index1 , pagesText[i].length);
                        }else{
                          var temp = s.substring(index1 , index2);
                        }
                    }
                    if(b_pos[x].localeCompare("I.") == 0){
                        for(j=0; j< a_i.length; j++){
                            if(temp.indexOf(a_i[j].replace(/ /g,'')) >= 0){
                                c_i++;
                            }
                        } 
                        document.getElementById("i").value = c_i; 
                        if(c_i >= 1 & c_i <= 4){
                            document.getElementById("p_i").value = "Low";
                        }else if(c_i >= 5 & c_i <=8){
                            document.getElementById("p_i").value = "Medium";
                        }else{
                            document.getElementById("p_i").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("II.") == 0){
                        for(j=0; j< a_ii.length; j++){
                            if(temp.indexOf(a_ii[j].replace(/ /g,'')) >= 0){
                                c_ii++;
                            }
                        }
                        document.getElementById("ii").value = c_ii;
                        if(c_ii >= 1 & c_ii  <= 6){
                            document.getElementById("p_ii").value = "Low";
                        }else if(c_ii  >= 7 & c_ii  <=12){
                            document.getElementById("p_ii").value = "Medium";
                        }else{
                            document.getElementById("p_ii").value = "High";
                        }  
                    }else if(b_pos[x].localeCompare("III.") == 0){
                        for(j=0; j< a_iii.length; j++){
                            if(temp.indexOf(a_iii[j].replace(/ /g,'')) >= 0){
                                c_iii++;
                            }
                        }
                        document.getElementById("iii").value = c_iii; 
                        if(c_iii >= 1 & c_iii <= 4){
                            document.getElementById("p_iii").value = "Low";
                        }else if(c_iii >= 5 & c_iii <=8){
                            document.getElementById("p_iii").value = "Medium";
                        }else{
                            document.getElementById("p_iii").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("IV.") == 0){
                        for(j=0; j< a_iv.length; j++){
                            if(temp.indexOf(a_iv[j].replace(/ /g,'')) >= 0){
                                c_iv++;
                            }
                        }
                        document.getElementById("iv").value = c_iv; 
                        if(c_iv >= 1 & c_iv <= 4){
                            document.getElementById("p_iv").value = "Low";
                        }else if(c_iv >= 4 &c_iv <=7){ //Larry
                            document.getElementById("p_iv").value = "Medium";
                        }else{
                            document.getElementById("p_iv").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("V.") == 0){
                        for(j=0; j< a_v.length; j++){
                            if(temp.indexOf(a_v[j].replace(/ /g,'')) >= 0){
                                c_v++;
                            }
                        }
                        document.getElementById("v").value = c_v; 
                        if(c_v >= 1 & c_v <= 3){
                            document.getElementById("p_v").value = "Low";
                        }else if(c_v >= 4 & c_v <=6){
                            document.getElementById("p_v").value = "Medium";
                        }else{
                            document.getElementById("p_v").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("VI.") == 0){
                        for(j=0; j< a_vi.length; j++){
                            if(temp.indexOf(a_vi[j].replace(/ /g,'')) >= 0){
                                c_vi++;
                            }
                        }
                        document.getElementById("vi").value = c_vi; 
                        if(c_vi >= 1 & c_vi <= 6){
                            document.getElementById("p_vi").value = "Low";
                        }else if(c_vi >= 7 & c_vi <=13){
                            document.getElementById("p_vi").value = "Medium";
                        }else{
                            document.getElementById("p_vi").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("VII.") == 0){
                        for(j=0; j< a_vii.length; j++){
                            if(temp.indexOf(a_vii[j].replace(/ /g,'')) >= 0){
                                c_vii++;
                            }
                        }
                        document.getElementById("vii").value = c_vii; 
                        if(c_vii>= 1 & c_vii <= 4){
                            document.getElementById("p_vii").value = "Low";
                        }else if(c_vii >= 5 & c_vii <= 8){
                            document.getElementById("p_vii").value = "Medium";
                        }else{
                            document.getElementById("p_vii").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("VIII") == 0){
                        for(j=0; j< a_viii.length; j++){
                            if(temp.indexOf(a_viii[j].replace(/ /g,'')) >= 0){
                                c_viii++;
                            }
                        }
                        document.getElementById("viii").value = c_viii; 
                        if(c_viii >= 1 & c_viii <= 2){
                            document.getElementById("p_viii").value = "Low";
                        }else if(c_viii >= 3 & c_viii <= 4){
                            document.getElementById("p_viii").value = "Medium";
                        }else{
                            document.getElementById("p_viii").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("IX") == 0){
                        for(j=0; j< a_ix.length; j++){
                            if(temp.indexOf(a_ix[j].replace(/ /g,'')) >= 0){
                                c_ix++;
                            }
                        }
                        document.getElementById("ix").value = c_ix; 
                        if(c_ix >= 1 & c_ix <= 5){
                            document.getElementById("p_ix").value = "Low";
                        }else if(c_ix >= 6 & c_ix <=10){
                            document.getElementById("p_ix").value = "Medium";
                        }else{
                            document.getElementById("p_ix").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("X.") == 0){
                        for(j=0; j< a_x.length; j++){
                            if(temp.indexOf(a_x[j].replace(/ /g,'')) >= 0){
                                c_x++;
                            }
                        }
                        document.getElementById("x").value = c_x; 
                        if(c_x>= 1 & c_x <= 3){
                            document.getElementById("p_x").value = "Low";
                        }else if(c_x >= 4 & c_x <= 6){
                            document.getElementById("p_x").value = "Medium";
                        }else{
                            document.getElementById("p_x").value = "High";
                        } 
                    }else if(b_pos[x].localeCompare("XI.") == 0){
                        for(j=0; j< a_xi.length; j++){
                            if(temp.indexOf(a_xi[j].replace(/ /g,'')) >= 0){
                                c_xi++;
                            }
                        }
                        document.getElementById("xi").value = c_xi; 
                        if(c_xi ==1){
                            document.getElementById("p_xi").value = "Low";
                        }else if(c_xi = 2){
                            document.getElementById("p_xi").value = "Medium";
                        }else{
                            document.getElementById("p_xi").value = "High";
                        } 
                    }else{
                        for(j=0; j< a_xii.length; j++){
                            if(temp.indexOf(a_xii[j].replace(/ /g,'')) >= 0){
                                c_xii++;
                            }
                        }
                        document.getElementById("xii").value = c_xii; 
                        if(c_xii >= 1 & c_xii <= 3){
                            document.getElementById("p_xii").value = "Low";
                        }else if(c_xii >= 4 & c_xii <= 5){
                            document.getElementById("p_xii").value = "Medium";
                        }else{
                            document.getElementById("p_xii").value = "High";
                        } 
                    }
                }
            } 
        }
    });

}, function (reason) {
    // PDF loading error
    console.log("Error loading pdf");
    console.error(reason);
    
});
}