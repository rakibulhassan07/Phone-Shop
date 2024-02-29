 const loadPhone=async (searchText,isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data =await res.json();
   // console.log(data.data)
   const phoneData=data.data
   displayPhones(phoneData,isShowAll)
 }

 const displayPhones = (phoneData,isShowAll) =>{

   const phoneContainer=document.getElementById('phone-container');
   //remove before card when new one is come 
   phoneContainer.textContent='';
  

   const show=document.getElementById('ShowAll')
   if(phoneData.length>12 && !isShowAll)
   {
      show.classList.remove('hidden');
   }
   else{
      show.classList.add('hidden');
   }

if(!isShowAll){
   phoneData=phoneData.slice(0,15);
}

   phoneData.forEach(Phone => {
      
      const phoneCard=document.createElement('div')
      phoneCard.classList=`card  bg-base-100 p-4 shadow-xl`;
      phoneCard.innerHTML=`
      <figure>
      <img
        src="${Phone.image}"
        alt="Shoes"
      />
    </figure>
    <div class="card-body ">
      <h2 class="card-title text-3xl font-bold">${Phone.phone_name}</h2>
      <p>There are many variations of passages of available, but the majority have suffered</p>
      <h2 class="card-title text-xl font-bold flex justify-center ">$999</h2>
      <div class="card-actions justify-center">
        <button onclick="showDetails('${Phone.slug}')" class="btn btn-primary">Show details</button>
      </div>
    </div>`;
   phoneContainer.appendChild(phoneCard);
   });
   loading(false); 
 }
const handleSearch=(isShowAll)=>{
   loading(true);
   const searchField=document.getElementById('fieldText').value;
   loadPhone(searchField,isShowAll)
   
}
const loading = (isLoading)=>{
    const loadData=document.getElementById('load')
    if(isLoading){
      loadData.classList.remove('hidden');
    }
    else{
      loadData.classList.add('hidden');
    }
   }

   const showAll=()=>{
      handleSearch(true);
   }
  const showDetails=async(id)=>{

// load data 
const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const dataDetails =await res.json();
const phone=dataDetails.data
showDetails1(phone);
  } 


  const showDetails1=(phone)=>{
   console.log(phone)
   const phoneName=document.getElementById('phone-name');
   phoneName.innerText=phone.name;

   const phoneDetails=document.getElementById('phone-details')
   phoneDetails.innerHTML=`
   <img
        src="${phone.image}"
        alt="/"
      />
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</P>
      <p><span class="text-lg font-bold">Storage : </span><span>${phone?.sensors?.storage}</span></P>
      <p><span class="text-lg font-bold">Display Size :</span><span>${phone?.mainFeatures?.displaySize}</span></P>
      <p><span class="text-lg font-bold">chipSet : </span><span>${phone?.mainFeatures?.chipSet}</span></P>
      <p><span class="text-lg font-bold">memory : </span><span>${phone?.mainFeatures?.memory}</span></P>
      <p><span class="text-lg font-bold">slug : </span><span>${phone?.slug}</span></P>
      <p><span class="text-lg font-bold">ReleaseDate : </span><span>${phone?.releaseDate}</span></P>
      <p><span class="text-lg font-bold">Brand :</span><span>${phone?.brand}</span></P>
      <p><span class="text-lg font-bold">GPS :</span><span>${phone?.others?.GPS || 'GPS Not Available'}</span></P>
   `
   Show_model.showModal()
  }
//  loadPhone();