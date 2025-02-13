'use server';


import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { deleteMeal } from "./meals";

function isInvalidText(text){
    return !text || text.trim() === '';

}


export default async function shareMeal(prevState,formData){

    
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    };

    if(
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.image|| !meal.creator_email.includes('@') || meal.image.size === 0
    )
    {
            return{
                message:'Invalid Input.',
            };
    }

    await saveMeal(meal);
    revalidatePath('/',"layout");
    redirect('/meals');
  
  }


  export async function removeMeal(slug) {
    deleteMeal(slug);
    revalidatePath('/meals');  // Refresh UI
}
