import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Planner() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        destination: "",
        style: "",
        planType: "",
        nearby: "",
    });

    const [dailyPlan, setDailyPlan] = useState(null);

    const generateDailyPlan = () => {
        return {
            date: "Today's Schedule",
            periods: [
                { id: "p1", label: "Breakfast", icon: "☕", activity: "Local Traditional Bakery", time: "08:00 AM" },
                { id: "p2", label: "Morning Activity", icon: "📍", activity: "Historical Museum Tour", time: "10:30 AM" },
                { id: "p3", label: "Lunch", icon: "🍽", activity: "Authentic Saudi Restaurant", time: "01:30 PM" },
                { id: "p4", label: "Coffee Break", icon: "☕", activity: "Specialty Coffee House", time: "04:00 PM" },
                { id: "p5", label: "Afternoon Activity", icon: "🚶", activity: "Al-Turaif District Walk", time: "05:30 PM" },
                { id: "p6", label: "Dinner", icon: "🍽", activity: "Skyline View Dining", time: "09:00 PM" },
            ]
        };
    };

    const handleSelect = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            setDailyPlan(generateDailyPlan());
            setStep(5);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const resetPlanner = () => {
        setAnswers({ destination: "", style: "", planType: "", nearby: "" });
        setDailyPlan(null);
        setStep(1);
    };

    const Option = ({ label, selected, onPress }) => (
        <Pressable
            onPress={onPress}
            style={[styles.option, selected && styles.optionSelected]}
        >
            <Text style={styles.optionText}>{label}</Text>
        </Pressable>
    );

    if (step === 5 && dailyPlan) {
        return (
            <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
                {/* Fixed Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.resultTitle}>{dailyPlan.date}</Text>
                        <Text style={styles.resultSubtitle}>{answers.destination} • {answers.style}</Text>
                    </View>
                    <Pressable style={styles.circularAddButton} onPress={resetPlanner}>
                        <Text style={styles.plusIcon}>+</Text>
                    </Pressable>
                </View>

                <ScrollView
                    style={{ flex: 1 }}

                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View style={styles.timelineContainer}>
                        {dailyPlan.periods.map((item, index) => (
                            <View key={item.id} style={styles.periodRow}>
                                <View style={styles.timelineLeading}>
                                    <Text style={styles.timeText}>{item.time}</Text>
                                    <View style={[
                                        styles.dot,
                                        index === dailyPlan.periods.length - 1 && { backgroundColor: 'transparent' }
                                    ]} />
                                    {index !== dailyPlan.periods.length - 1 && <View style={styles.line} />}
                                </View>

                                <View style={styles.periodCard}>
                                    <Text style={styles.periodLabel}>{item.label}</Text>
                                    <Text style={styles.activityText}>{item.icon} {item.activity}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }}>
            <Text style={styles.title}>Trip Planner</Text>
            <Text style={styles.subtitle}>Step {step} of 4</Text>

            <View style={styles.container}>
                {step === 1 && (
                    <>
                        <Text style={styles.question}>Where are you going?</Text>
                        {["Riyadh", "Al-Ula", "Diriyah", "Al-Qassim"].map(loc => (
                            <Option key={loc} label={loc} selected={answers.destination === loc} onPress={() => handleSelect("destination", loc)} />
                        ))}
                    </>
                )}
                {step === 2 && (
                    <>
                        <Text style={styles.question}>Trip Style?</Text>
                        {["Luxury", "Family", "Local", "Relaxed"].map(s => (
                            <Option key={s} label={s} selected={answers.style === s} onPress={() => handleSelect("style", s)} />
                        ))}
                    </>
                )}
                {step === 3 && (
                    <>
                        <Text style={styles.question}>Plan Type?</Text>
                        {["Full Day", "Short Day", "No Breakfast"].map(p => (
                            <Option key={p} label={p} selected={answers.planType === p} onPress={() => handleSelect("planType", p)} />
                        ))}
                    </>
                )}
                {step === 4 && (
                    <>
                        <Text style={styles.question}>Prefer nearby places?</Text>
                        {["Yes", "No"].map(n => (
                            <Option key={n} label={n} selected={answers.nearby === n} onPress={() => handleSelect("nearby", n)} />
                        ))}
                    </>
                )}

                <View style={styles.buttonStack}>
                    <Pressable style={styles.nextButton} onPress={nextStep}>
                        <Text style={styles.nextText}>{step === 4 ? "Generate Day Plan" : "Next"}</Text>
                    </Pressable>
                    {step > 1 && (
                        <Pressable style={styles.backButton} onPress={prevStep}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, marginTop: 60, textAlign: "center", fontWeight: "bold", color: "#333" },
    subtitle: { textAlign: "center", marginBottom: 20, color: "#666" },
    question: { fontSize: 18, marginBottom: 15, fontWeight: "600" },
    option: { backgroundColor: "#fff", padding: 16, marginVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: "#eee" },
    optionSelected: { borderColor: "#419b55", backgroundColor: "#f0f9f2" },
    optionText: { fontSize: 16 },
    buttonStack: { marginTop: 30, alignItems: "center" },
    nextButton: { backgroundColor: "#419b55", padding: 18, borderRadius: 15, width: "100%", alignItems: "center", marginBottom: 10 },
    backButton: { padding: 15, width: "100%", alignItems: "center" },
    nextText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    backButtonText: { color: "#419b55", fontWeight: "600" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
        marginTop: 60,
        marginBottom: 10
    },
    resultTitle: { fontSize: 24, fontWeight: "bold", color: "#333" },
    resultSubtitle: { fontSize: 14, color: "#666" },
    circularAddButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#419b55",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    plusIcon: { color: "#fff", fontSize: 24, fontWeight: "bold" },

    timelineContainer: {
        padding: 20
    },
    periodRow: {
        flexDirection: "row",
        minHeight: 100
    },
    timelineLeading: {
        width: 70,
        alignItems: "center"
    },
    timeText: {
        fontSize: 11,
        color: "#888",
        fontWeight: "bold",
        marginBottom: 4
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#419b55",
        zIndex: 2
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: "#419b55",
        marginVertical: -2
    },
    periodCard: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        marginLeft: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3
    },
    periodLabel: {
        fontSize: 12,
        color: "#419b55",
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 4
    },
    activityText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500"
    },
});