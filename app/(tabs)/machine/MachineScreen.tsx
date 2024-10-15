import MachineView from "@/components/items/machineItem";
import { Machine, machineList } from "@/service/machineService";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

type Route = {
  key: string;
  title: string;
};

const renderMachineList = (
  data: Machine[],
  refreshing: boolean,
  onRefresh: () => void
) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.machineNumber.toString()}
    renderItem={({ item }) => (
      <MachineView machineNumber={item.machineNumber} status={item.status} />
    )}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  />
);

export default function MachineScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [availableMachines, setAvailableMachines] = useState<Machine[]>([]);
  const [runningMachines, setRunningMachines] = useState<Machine[]>([]);
  const [index, setIndex] = useState(0); // Tab index
  const [routes] = useState<Route[]>([
    { key: "available", title: "Available" },
    { key: "running", title: "Running" },
  ]);

  useEffect(() => {
    // Lấy danh sách máy giặt từ service
    setMachines(machineList);
  }, []);

  useEffect(() => {
    // Lọc các máy có trạng thái available và running
    setAvailableMachines(machines.filter((machine) => machine.status === "available"));
    setRunningMachines(machines.filter((machine) => machine.status === "running"));
  }, [machines]);

  const onRefresh = () => {
    setRefreshing(true);
    // Giả lập việc tải lại dữ liệu
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Giả lập thời gian tải dữ liệu
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "blue" }}
      style={{ backgroundColor: "cyan" }}
      labelStyle={{ color: "black" }}
      getLabelText={({ route }) => route.title}
    />
  );

  // Hàm để render các tab
  const AvailableMachines = () => renderMachineList(availableMachines, refreshing, onRefresh);
  const RunningMachines = () => renderMachineList(runningMachines, refreshing, onRefresh);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          available: AvailableMachines,
          running: RunningMachines,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
