def predict_triage(symptoms):

    symptoms = symptoms.lower()

    if "chest pain" in symptoms or "breathing" in symptoms:
        return {
            "department": "Emergency",
            "priority": "Emergency"
        }

    elif "fever" in symptoms or "cough" in symptoms:
        return {
            "department": "General Medicine",
            "priority": "Medium"
        }

    else:
        return {
            "department": "OPD",
            "priority": "Low"
        }