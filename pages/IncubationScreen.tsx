import { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { PetContext } from "../contexts/PetContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formatTimeString } from "../utils/hatchUtils";
import PrematureHatchButton from "./components/PrematureHatchButton";
import Icon from "react-native-vector-icons/Ionicons";
import {
  CleanInfoModal,
  FeedInfoModal,
  HealthInfoModal,
  HibernationModal,
  MainInfoModal,
  MedicineInfoModal,
  PettingInfoModal,
} from "./components/IncubationInfoModals";
import { InfoPanel } from "./components/InfoPanel";
import { styles } from "./StyleSheets/IncubationScreenStyles";

export default function IncubationScreen() {
  const navigation = useNavigation();
  const { petData, setPetData } = useContext(PetContext);
  const [message, setMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));
  const [progressColour, setProgressColour] = useState("orange");
  // const [disabled, setDisabled] = useState(true);
  // const [progressButtonStyle, setProgressButtonStyle] = useState(
  //   styles.disabledButton
  // );
  const [hatchTime, setHatchTime] = useState(0);
  const [isHibernating, setHibernating] = useState(false);
  const [isMainInfoModalVisible, setMainInfoModalVisible] = useState(false);
  const [isHealthModalVisible, setHealthModalVisible] = useState(false);
  const [isFeedInfoModalVisible, setFeedInfoModalVisible] = useState(false);
  const [isMedicineInfoModalVisible, setMedicineInfoModalVisible] =
    useState(false);
  const [isPettingInfoModalVisible, setPettingInfoModalVisible] =
    useState(false);
  const [isCleanInfoModalVisible, setCleanInfoModalVisible] = useState(false);
  // const [healthIntervalId, setHealthIntervalId] = useState();

  function checkHibernation(incubationHealth: number) {
    if (incubationHealth === 0.05) {
      setHibernating(true);
    }
    if (incubationHealth > 0.05) {
      setHibernating(false);
    }
  }

  function updateProgressColour(value: number) {
    if (value >= 0.75) {
      setProgressColour("green");
    } else if (value >= 0.15) {
      setProgressColour("orange");
    } else if (value >= 0) {
      console.log(value);
      setProgressColour("red");
    }
  }
  useFocusEffect(
    useCallback(() => {
      console.log("incubationHealth on focus:", petData.incubationHealth);

      if (petData.hibernationBegan) {
        setHibernating(true);
        // const elapsedHibernationTime = now - petData.hibernationBegan
      }

      //calculate remaining hatch time on screen focus
      const now = Date.now();
      // if(!petData.hibernationBegan)
      const beganIncubation = petData.beganIncubation || now;
      const extraTime = petData.extraTime || 0; //extra time is when countdown is paused for some reason
      const elapsedHatchTime = now - beganIncubation - extraTime;
      const remainingHatchTime = 86400000 - elapsedHatchTime; // default 24 hours in incubation

      setHatchTime(remainingHatchTime);

      //update petData
      if (!petData.beganIncubation || extraTime) {
        const newPetData = {
          ...petData,
          beganIncubation,
          extraTime,
          incubationHealthLastChanged: now,
        };
        setPetData(newPetData);
      }

      //calculate health
      if (petData.incubationHealthLastChanged) {
        const incubationHealthLastChanged = petData.incubationHealthLastChanged;

        const elapsedHealthTime = now - incubationHealthLastChanged;
        const healthDecay = elapsedHealthTime / 6000000; //60,000 minutes *0.01 - 1 percent per minute //change this to 60000 to view change every second
        const incubationHealth = Math.max(
          petData.incubationHealth - healthDecay,
          0.05
        );
        console.log(incubationHealth, "in use focus effect");
        updateProgressColour(incubationHealth);
        checkHibernation(incubationHealth);
        setPetData((petData) => {
          return { ...petData, incubationHealth };
        });
      }

      //visible countdown
      let hatchIntervalId: any;
      let healthIntervalId: any;
      if (!petData.hibernationBegan) {
        hatchIntervalId = setInterval(() => {
          setHatchTime((currHatchTime) => Math.max(currHatchTime - 1000, 0));
        }, 1000);

        healthIntervalId = setInterval(() => {
          setPetData((petData) => {
            let hibernationBegan = petData.hibernationBegan;
            const newIncubationHealth = Math.max(
              petData.incubationHealth - 0.01,
              0.05
            );
            console.log(newIncubationHealth, "inside interval");
            updateProgressColour(newIncubationHealth);
            checkHibernation(newIncubationHealth);
            if (!hibernationBegan) {
              hibernationBegan = Date.now();
            }
            return {
              ...petData,
              incubationHealth: newIncubationHealth,
              hibernationBegan,
            };
          });
        }, 60000); //change this to 600 to view change every second
      }
      console.log("rendered");

      return () => {
        console.log("cleared");
        clearInterval(hatchIntervalId);
        clearInterval(healthIntervalId);
        setPetData((petData) => {
          return { ...petData, incubationHealthLastChanged: now };
        });
      };
    }, [isHibernating])
  );

  function showMessage(text: string) {
    const now = Date.now();

    setMessage(text);

    let newIncubationHealth = petData.incubationHealth + 0.1;

    if (petData.incubationHealth >= 0.9) {
      newIncubationHealth = 1;
    }

    setPetData((petData) => {
      return {
        ...petData,
        incubationHealth: newIncubationHealth,
        incubationHealthLastChanged: now,
      };
    });

    updateProgressColour(newIncubationHealth);

    console.log(newIncubationHealth, "in btn");

    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMessage("");
      }
    });
  }

  function handleHatch() {
    setPetData((petData) => {
      return {
        ...petData,
        justHatched: true,
        incubationHealth: 0.5, //reset
      };
    });
    navigation.navigate("Pet");
    //some logic on pet page to show a congratulations message
    // when justHatched===true, after which justHatched is set
    // to false (so the congratulations only shows first time)
  }

  function handleTitle() {
    setMainInfoModalVisible(true);
  }
  function handleHealth() {
    setHealthModalVisible(true);
  }
  function handleInteractionInfo(interaction: string) {
    switch (interaction) {
      case "Feed":
        setFeedInfoModalVisible(true);
        break;

      case "Medicate":
        setMedicineInfoModalVisible(true);
        break;

      case "Pet":
        setPettingInfoModalVisible(true);
        break;

      case "Clean":
        setCleanInfoModalVisible(true);
        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={handleTitle}>
        <Text style={styles.title}>🌿 Nurture Chamber 🌿</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.petContainer}>
          <View style={styles.petModel}>
            <Text>[Ill pet]</Text>
          </View>

          <View>
            {hatchTime > 0 ? ( // Change > to < to view hatch me button
              <Text style={styles.hatchCountdownText}>
                ⏳ {formatTimeString(hatchTime)}
              </Text>
            ) : (
              <TouchableOpacity
                style={styles.hatchButton}
                onPress={handleHatch}
              >
                <Text style={styles.hatchButtonText}>✨ Take Me Home 🏠✨</Text>
              </TouchableOpacity>
            )}
          </View>
          {hatchTime > 0 && (
            <PrematureHatchButton
              progress={petData.incubationHealth}
              handleHatch={handleHatch}
            />
          )}

          <TouchableOpacity
            style={[styles.healthContainer, styles.section]}
            activeOpacity={1}
            onPress={handleHealth}
          >
            <Icon name={"heart"} size={24} color="#3d3d3d" />
            <Text style={styles.healthText}> Health:</Text>
            <View
            // style={styles.progressBarContainer}💜
            >
              <Progress.Bar
                progress={petData.incubationHealth}
                color={progressColour}
                width={Dimensions.get("window").width * 0.64}
                height={25}
                // borderColor={"#ba68c8"}
                // borderColor={"#3d3d3d"}
                borderColor={"#5a4a42"}
                borderWidth={3}
                borderRadius={10}
              />
              <Text style={styles.progressText}>
                {Math.round(petData.incubationHealth * 100)}%
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          {message !== "" && (
            <Animated.View style={[styles.speechBubble, { opacity: fadeAnim }]}>
              <Text style={styles.message}>{message}</Text>
            </Animated.View>
          )}

          <View
            style={styles.interactionButtonsContainer}
            // style={styles.section}
          >
            {[
              { text: "Feed", icon: "fast-food", msg: "That was tasty!" },
              { text: "Medicate", icon: "eyedrop-outline", msg: "Yuck!" },
              { text: "Pet", icon: "hand-left", msg: "*Wags tail*" },
              { text: "Clean", icon: "water-outline", msg: "*wet dog shake*" },
            ].map((btn) => {
              return (
                <View key={btn.text} style={styles.interactionButtonWrapper}>
                  <Pressable
                    key={btn.text}
                    disabled={petData.incubationHealth === 1}
                    style={[
                      styles.button,
                      petData.incubationHealth !== 1
                        ? styles.buttonEnabled
                        : styles.buttonDisabled,
                    ]}
                    onPress={() => showMessage(btn.msg)}
                    onLongPress={() => {
                      handleInteractionInfo(btn.text);
                    }}
                  >
                    <Icon name={btn.icon} size={30} color="white" />
                  </Pressable>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      handleInteractionInfo(btn.text);
                    }}
                  >
                    <Text style={styles.interactionText}>{btn.text}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {isHibernating && (
        <HibernationModal
          handleExit={() => {
            setHibernating(false);
            showMessage("You saved me!");
            setPetData((petData) => {
              const now = Date.now();
              const prevExtraTime = petData.extraTime || 0;
              const extraTime = now - petData.hibernationBegan + prevExtraTime;

              return {
                ...petData,
                hibernationBegan: undefined,
                extraTime,
                // incubationHealthLastChanged: now,
              };
            });
          }}
        />
      )}

      <InfoPanel />

      <MainInfoModal
        isMainInfoModalVisible={isMainInfoModalVisible}
        setMainInfoModalVisible={setMainInfoModalVisible}
      />

      <HealthInfoModal
        isHealthModalVisible={isHealthModalVisible}
        setHealthModalVisible={setHealthModalVisible}
      />

      <FeedInfoModal
        isFeedInfoModalVisible={isFeedInfoModalVisible}
        setFeedInfoModalVisible={setFeedInfoModalVisible}
      />
      <MedicineInfoModal
        isMedicineInfoModalVisible={isMedicineInfoModalVisible}
        setMedicineInfoModalVisible={setMedicineInfoModalVisible}
      />
      <PettingInfoModal
        isPettingInfoModalVisible={isPettingInfoModalVisible}
        setPettingInfoModalVisible={setPettingInfoModalVisible}
      />
      <CleanInfoModal
        isCleanInfoModalVisible={isCleanInfoModalVisible}
        setCleanInfoModalVisible={setCleanInfoModalVisible}
      />
    </SafeAreaView>
  );
}
