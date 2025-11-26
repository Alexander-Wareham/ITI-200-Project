var curReads=document.getElementById("currentlyReading");


async function updateReads(event) {
    if(event.target && event.target.tagName === "BUTTON" && event.target.id.endsWith("UpdateBtn")){
        const title=event.target.id.replace("UpdateBtn", "");
        const itemId = title + "UpdateForm";
        
        const form=document.getElementById(itemId);

        form.style.display = 'block';
        
        
    } else if (event.target && event.target.tagName === "INPUT" && event.target.id.endsWith("UpdateSubmit")) {
        const title=event.target.id.replace("UpdateSubmit", "");

        event.preventDefault();

        rStatus = document.querySelector('input[name="Status"]:checked');

        curPages=document.getElementById("pageRead" + title);
        totPages=document.getElementById("totalPages" + title);

        if(parseInt(totPages.value) < parseInt(curPages.value)){
            alert("Your current page cannot be greater than the total pages");
            return false;
        }

        const progress = {
            username:localStorage.getItem("username"), 
            book: title,
            currentPage: curPages.value,
            totalPages: totPages.value,
            readingStatus:rStatus.value
        
        };

        await fetch("/api/home/editBookProgress", {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(progress)
        });



        const pagesRead=document.getElementById(title + "PagesRead");
        const prog=document.getElementById(title+"ProgressBar");
        const progressLabel=document.getElementById(title+"ProgressBarLabel");

        const form=document.getElementById(title+"UpdateForm");

        const percent=Math.round((parseFloat(curPages.value)/parseFloat(totPages.value))*100)
        pagesRead.innerText=curPages.value;
        prog.style.width=percent+"%";
        prog.textContent=percent+"%";
        progressLabel.setAttribute("aria-valuenow", percent);

        console.log({ prog, curPages, totPages, percent });

        
        form.style.display='none';


    }
}


curReads.addEventListener("click", updateReads);

