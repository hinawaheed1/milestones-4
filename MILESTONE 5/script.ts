//Get references to form and display area
const Form = document.getElementById('resume-form')as HTMLFormElement;
const ResumeDisplayElement = document.getElementById('resume-display')as HTMLDivElement;

const ShareableLinkContainer = document.getElementById('shareable-link-container')as HTMLDivElement;

const ShareableLinkElement = document.getElementById('shareable-link-')as HTMLAnchorElement;

const DownloadpdfButton = document.getElementById('downlaodpdf') as HTMLButtonElement;

//Handle from submission
Form.addEventListener('submit',(event: Event) => {
    event.preventDefault(); //prevent page reload

    //Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value
    const name = (document.getElementById('name')as HTMLInputElement).value
    const email =(document.getElementById('email')as HTMLInputElement).value
    const phone = (document.getElementById('phone')as HTMLInputElement).value
    const education = (document.getElementById('education')as HTMLTextAreaElement).value
    const experience = (document.getElementById('experience')as HTMLTextAreaElement).value
    const skills = (document.getElementById('skills')as HTMLTextAreaElement).value

    //save form data in localstorage with the username as the key
    const resumeData ={
        name,
        email,
        phone,
        education,
        experience,
        skills,
    };
    localStorage.setItem(username,JSON.stringify(resumeData)); //saveing the data localiy

    //Generate the resume content dynamically
    const resumeHTML = `
    <h2>Editable Resume</h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span contenteditable= "true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable="tru">${education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
    `;

    //Display the generated resume
    ResumeDisplayElement.innerHTML = resumeHTML;

    //Generate a shareable URL with the username only
    const shareableURL = '${windo.location.origin}?username=${encodeURIComponent(username)}';

    //Display the shareable link
    ShareableLinkContainer.style.display = 'black';
    ShareableLinkElement.href = shareableURL;
    ShareableLinkElement.textContent = shareableURL;

   });
   //Handle PDF download
   DownloadpdfButton.addEventListener('click',() =>{
    window.print(); // This will open the print dialog and allow the user to save as PDF
   });
   //Prefill the from based on the username in the URL
   window.addEventListener('DOCMContentLoaded',() =>{
    const urlparams = new URLSearchParams(window.location.search);
    const username = urlparams.get('username');
    if (username) {
        //Autofill from if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
       const  resumeData = JSON.parse(savedResumeData);
       (document.getElementById('username') as HTMLInputElement).value = username;
       (document.getElementById('name') as HTMLInputElement).value = username;
       (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
       (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
       (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
       (document.getElementById('experaince') as HTMLInputElement).value = resumeData.experaince;
       (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills

   }
    }
   });
    




















    
