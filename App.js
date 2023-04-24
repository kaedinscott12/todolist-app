import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { CheckBox, Input, Text, Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import * as Font from "expo-font";

const mainTask = [
  { key: "1", title: "Title 1", completed: false, priority: "low" },
  {
    key: "2",
    title: "Title 2",
    completed: true,
    priority: "medium",
  },
  {
    key: "3",
    title: "Title 3",
    completed: false,
    priority: "high",
  },
];

const App = () => {
  const [tasks, setTasks] = useState(mainTask);
  const [addTaskTitle, setTaskTitle] = useState("");
  const [addTaskPriority, setTaskPriority] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");

  const taskToggle = (key) => {
    const newTasks = tasks.map((task) =>
      task.key === key ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const newTaskSubmit = () => {
    const newTask = {
      key: Math.random().toString(),
      title: addTaskTitle,
      completed: false,
      priority: addTaskPriority,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskPriority("low");
  };
  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <CheckBox
        key={item.key}
        title={
          <Text
            style={
              item.completed
                ? {
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }
                : null
            }
          >
            {item.title}
          </Text>
        }
        checked={item.completed}
        onPress={() => taskToggle(item.key)}
      />
      <Text style={{ marginLeft: 10 }}>{item.priority}</Text>
    </View>
  );

  const filteredTasks = tasks.filter((task) => {
    return task.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <View>
      <Input
        placeholder="Search for a task"
        value={searchTerm}
        onChangeText={handleSearch} // Step 4
      />
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <Input
        placeholder="Add new task"
        value={addTaskTitle}
        onChangeText={setTaskTitle}
        onSubmitEditing={newTaskSubmit}
      />
      <View>
        <Text>Select priority</Text>
        <Picker
          selectedValue={addTaskPriority}
          onValueChange={(itemValue, itemIndex) => setTaskPriority(itemValue)}
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      <Button title="Add" onPress={newTaskSubmit} />
    </View>
  );
};

export default App;
