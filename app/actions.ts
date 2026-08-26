"use server";

export async function submitPilgrimage(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}

export async function submitVolunteer(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
