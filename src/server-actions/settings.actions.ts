"use server";
import "server-only";

import { auth } from "@/auth";
import {
  AppearanceSettingsFormState,
  GeneralSettingsFormState,
} from "@/lib/interfaces/server-action.interface";
import { generalTaskSchema } from "@/validationsSchemas/settings.validation";
import { AppTheme, WeekStartDay } from "@prisma/client";
import {
  updateUserAppearanceSettings,
  updateUserGeneralSettings,
} from "@/services/settings.service";
import { revalidatePath } from "next/cache";

export async function updateUserGeneralSettingsAction(
  state: GeneralSettingsFormState,
  formData: FormData
): Promise<GeneralSettingsFormState> {
  try {
    const userSession = await auth();

    if (!userSession?.user.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const autoArchive = (formData.get("autoArchive") as string) === "on";
    const tempAutoArchiveTime = formData.get("autoArchiveTime") as string;
    const autoArchiveTime = autoArchive
      ? parseInt(tempAutoArchiveTime.split(" ")[0])
      : undefined;
    const timeFrequency = autoArchive
      ? tempAutoArchiveTime.split(" ")[1]
      : undefined;

    const getFormPayload = {
      timeZone: formData.get("timeZone") as string,
      dateFormat: formData.get("dateFormat") as string,
      weekStartDay: formData.get("weekStartDay") as WeekStartDay,
      autoArchive: autoArchive,
      autoArchiveTime: autoArchiveTime,
      timeFrequency: timeFrequency,
    };

    const validatedFields = generalTaskSchema.safeParse({
      timeZone: getFormPayload.timeZone ?? "",
      dateFormat: getFormPayload.dateFormat ?? "",
      weekStartDay: getFormPayload.weekStartDay ?? "",
      autoArchive: getFormPayload.autoArchive,
      autoArchiveTime: getFormPayload.autoArchiveTime,
      timeFrequency: getFormPayload.timeFrequency,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        formValues: {
          timeZone: getFormPayload.timeZone,
          dateFormat: getFormPayload.dateFormat,
          weekStartDay: getFormPayload.weekStartDay,
          autoArchive: autoArchive,
          autoArchiveTime: tempAutoArchiveTime,
        },
        success: false,
        message: "Validation error",
      };
    }

    const newSettingsData = await updateUserGeneralSettings({
      userId: userSession.user.id,
      timeZone: validatedFields.data.timeZone,
      dateFormat: validatedFields.data.dateFormat,
      weekStartDay: validatedFields.data.weekStartDay,
      autoArchive: validatedFields.data.autoArchive,
      autoArchiveTime: validatedFields.data.autoArchiveTime,
      timeFrequency: validatedFields.data.timeFrequency,
    });

    revalidatePath("/settings");
    return {
      success: true,
      errors: {},
      formValues: {
        timeZone: newSettingsData.timeZone,
        dateFormat: newSettingsData.dateFormat,
        weekStartDay: newSettingsData.weekStartDay,
        autoArchive: newSettingsData.autoArchive,
        autoArchiveTime: newSettingsData.autoArchiveTime
          ? `${newSettingsData.autoArchiveTime} ${newSettingsData.autoArchiveTimeFrequency}`
          : null,
      },
      message: "Settings updated successfully",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}

export async function saveAppearanceSettingsAction(
  state: AppearanceSettingsFormState,
  formData: FormData
): Promise<AppearanceSettingsFormState> {
  try {
    const userSession = await auth();

    if (!userSession?.user.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await updateUserAppearanceSettings({
      userId: userSession.user.id,
      theme: formData.get("theme") as AppTheme,
      accentColor: formData.get("accentColor") as string,
      glassEffectIntensity: parseInt(
        formData.get("glassEffectIntensity") as string
      ),
    });

    revalidatePath("/settings");
    return {
      success: true,
      message: "Settings updated successfully",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}
