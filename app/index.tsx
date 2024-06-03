import { Button } from '@/src/components/Button';
import { SkillCard } from '@/src/components/SkillCard';
import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TextInput, Platform, 
  FlatList, 
  StatusBar 
} from "react-native";

interface SkillData {
  id: string;
  name: string;
}

export default function Index() {
  const [newSkill, setNewSkill] = useState<string>('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState<string>();

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    let hourForGreeting = new Date().getHours();
    let hourWithGmt = hourForGreeting - 3;
    
    if(hourWithGmt < 12){
      setGreeting('Good Morning!')
    } 

    if(hourWithGmt >= 12 && hourWithGmt <= 18){
      setGreeting('Good Afternoon!')
    }

    if(hourWithGmt > 18){
      setGreeting('Good Evening!')
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='#121015'
      />

      <Text style={styles.title}>Welcome, Rodrigo</Text>

      <Text style={styles.greeting}>{greeting}</Text>

      <TextInput 
        style={styles.input} 
        placeholder="New Skill" 
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
      />

      <Button 
        title="Add"   
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>


      <FlatList 
        data={mySkills}
        keyExtractor={(item) => item.id}  
        renderItem={({item}) => (
          <SkillCard 
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />  
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 50
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS == 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greeting: {
    color: '#FFF',
  }
})

