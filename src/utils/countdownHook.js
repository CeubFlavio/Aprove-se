import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useCountdown = (canCount) => {
  const navigation = useNavigation();

  const user = useSelector(state => state.user);

  const [hours, setHours] = useState(user.hours);
  const [minutes, setMinutes] = useState(user.minutes);
  const [seconds, setSeconds] = useState(user.seconds);

  function clearHistoryAndGoStatics(){
    navigation.popToTop();
    navigation.navigate("Home");
    navigation.navigate("Statistics")
  }

  useEffect(() => {
    if (seconds == 0 && hours == 0 && minutes == 0){
        return Alert.alert(
          "Tempo esgotado",
          "O tempo do simulado acabou. Confira as suas estatíticas.",
          [
            { text: "OK", onPress: () => { clearHistoryAndGoStatics();} }
          ],
          {
            onDismiss: () => { clearHistoryAndGoStatics() }
          }
      );
    }
    const interval = setInterval(() => {
      if (!canCount) return;
      if (seconds == 0){
          setSeconds(59);
          if (hours > 0 && minutes == 0){
            setHours(hours - 1);
            setMinutes(59);
          }else if (minutes > 0){
            setMinutes(minutes - 1);
          }
        }else{
          setSeconds(seconds - 1);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, canCount]);

  return [hours, minutes, seconds];
};

export { useCountdown };