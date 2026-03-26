const updateGamification = (user,action)=>{
   const today = new Date().toDateString();

   if (action === "upload") user.xp += 10;
   if(action ==="chat") user.xp +=5;

   if(!user.lastActiveDate){
    user.strak =1;
   } else {
    const lastDate = new Date(user.lastActiveDate).toDateString();
    if (lastDate === today){

    }else{
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() -1);

        if (new Date(user.lastActiveDate).toDateString() === yesterday.toDateString()){
            user.streak +=1;
        }else{
            user.streak =1;
        }
    }
   }

   user.lastActiveDate = new Date ();

   if (user.xp >=50 && !user.badges.includes("Beginner")){
        user.badges.push("Beginner");
   }
    if (user.xp >=200 && !user.badges.includes("Intermediate")){
        user.badges.push("Intermediate");
    }
    if (user.xp >=500 && !user.badges.includes("Pro Learner")){
        user.badges.push("Pro Learner");
    }

};

export default updateGamification;