import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

const DebuggingScreen = () => {
  const [activeTab, setActiveTab] = useState('console');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [codeInput, setCodeInput] = useState(`function findBug() {
  let numbers = [1, 2, 3, 4, 5];
  let sum = 0;
  
  // Bug: Using var instead of let in loop
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  
  // Bug: Accessing i outside loop scope
  console.log("Sum:", sum, "Last i:", i);
  return sum;
}

findBug();`);
  const [breakpoints, setBreakpoints] = useState<number[]>([3, 7]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionSpeed, setExecutionSpeed] = useState(1);
  const [variables, setVariables] = useState([
    { name: 'numbers', value: '[1, 2, 3, 4, 5]', type: 'Array' },
    { name: 'sum', value: '0', type: 'Number' },
    { name: 'i', value: 'undefined', type: 'Number' },
  ]);

  const tabs = [
    { id: 'console', title: 'Console', icon: 'terminal' },
    { id: 'breakpoints', title: 'Breakpoints', icon: 'pause-circle' },
    { id: 'variables', title: 'Variables', icon: 'code-slash' },
    { id: 'network', title: 'Network', icon: 'wifi' },
    { id: 'performance', title: 'Performance', icon: 'speedometer' },
  ];

  const debugTools = [
    { icon: 'play', title: 'Run', color: Colors.success },
    { icon: 'pause', title: 'Pause', color: Colors.warning },
    { icon: 'stop', title: 'Stop', color: Colors.error },
    { icon: 'arrow-forward', title: 'Step Over', color: Colors.secondary },
    { icon: 'arrow-down', title: 'Step Into', color: Colors.secondary },
    { icon: 'arrow-up', title: 'Step Out', color: Colors.secondary },
  ];

  const commonIssues = [
    { title: 'Syntax Error', description: 'Missing semicolon or bracket', fix: 'Add missing semicolon at line 5' },
    { title: 'Type Error', description: 'Undefined variable access', fix: 'Check variable declaration' },
    { title: 'Range Error', description: 'Array index out of bounds', fix: 'Check loop conditions' },
    { title: 'Logic Error', description: 'Infinite loop detected', fix: 'Update loop increment' },
  ];

  const networkRequests = [
    { id: 1, method: 'GET', url: '/api/users', status: '200 OK', time: '150ms' },
    { id: 2, method: 'POST', url: '/api/login', status: '401 Unauthorized', time: '200ms' },
    { id: 3, method: 'GET', url: '/api/data', status: '500 Error', time: '500ms' },
  ];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput(prev => [...prev, '> Running code...', '> Debugging started', '> Breakpoint hit at line 3', '> Variable i declared', '> Sum calculated: 15', '> Last i: 5', '> Debugging completed']);
    
    // Simulate variable updates
    setTimeout(() => {
      setVariables([
        { name: 'numbers', value: '[1, 2, 3, 4, 5]', type: 'Array' },
        { name: 'sum', value: '15', type: 'Number' },
        { name: 'i', value: '5', type: 'Number' },
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleAddBreakpoint = (line: number) => {
    if (!breakpoints.includes(line)) {
      setBreakpoints(prev => [...prev, line]);
      setConsoleOutput(prev => [...prev, `> Added breakpoint at line ${line}`]);
    }
  };

  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'console':
        return (
          <View style={styles.tabContent}>
            <View style={styles.consoleHeader}>
              <Text style={styles.consoleTitle}>Console Output</Text>
              <TouchableOpacity onPress={handleClearConsole}>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.consoleOutput}>
              {consoleOutput.map((line, index) => (
                <Text key={index} style={styles.consoleLine}>
                  {line}
                </Text>
              ))}
            </ScrollView>
            <View style={styles.consoleInputContainer}>
              <TextInput
                style={styles.consoleInput}
                placeholder="Type command here..."
                placeholderTextColor={Colors.gray}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Icon name="send" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'breakpoints':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Breakpoints</Text>
              <TouchableOpacity onPress={() => setBreakpoints([])}>
                <Text style={styles.clearButton}>Clear All</Text>
              </TouchableOpacity>
            </View>
            {breakpoints.length > 0 ? (
              breakpoints.map((line, index) => (
                <View key={index} style={styles.breakpointItem}>
                  <Icon name="pause-circle" size={20} color={Colors.error} />
                  <Text style={styles.breakpointText}>Line {line}</Text>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => setBreakpoints(prev => prev.filter(b => b !== line))}
                  >
                    <Icon name="close" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No breakpoints set</Text>
            )}
            
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Add Breakpoint</Text>
            </View>
            <View style={styles.addBreakpointContainer}>
              <TextInput
                style={styles.lineInput}
                placeholder="Enter line number"
                keyboardType="numeric"
                placeholderTextColor={Colors.gray}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddBreakpoint(10)}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'variables':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Current Variables</Text>
              <TouchableOpacity>
                <Icon name="refresh" size={20} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
            {variables.map((variable, index) => (
              <View key={index} style={styles.variableItem}>
                <View style={styles.variableHeader}>
                  <Text style={styles.variableName}>{variable.name}</Text>
                  <Text style={styles.variableType}>{variable.type}</Text>
                </View>
                <Text style={styles.variableValue}>{variable.value}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'network':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Network Requests</Text>
              <TouchableOpacity>
                <Icon name="refresh" size={20} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
            {networkRequests.map((request) => (
              <TouchableOpacity key={request.id} style={styles.networkRequest}>
                <View style={[
                  styles.requestMethod,
                  request.method === 'GET' && styles.methodGet,
                  request.method === 'POST' && styles.methodPost,
                ]}>
                  <Text style={styles.requestMethodText}>{request.method}</Text>
                </View>
                <View style={styles.requestDetails}>
                  <Text style={styles.requestUrl}>{request.url}</Text>
                  <Text style={[
                    styles.requestStatus,
                    request.status.includes('200') && styles.statusSuccess,
                    request.status.includes('40') && styles.statusWarning,
                    request.status.includes('50') && styles.statusError,
                  ]}>
                    {request.status}
                  </Text>
                </View>
                <Text style={styles.requestTime}>{request.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'performance':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performance Metrics</Text>
            </View>
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>2.4s</Text>
                <Text style={styles.metricLabel}>Load Time</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>87%</Text>
                <Text style={styles.metricLabel}>CPU Usage</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>156MB</Text>
                <Text style={styles.metricLabel}>Memory</Text>
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Debugging Tools</Text>
          <Text style={styles.headerSubtitle}>Find and fix issues in your code</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="settings" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="help-circle" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.mainContent}>
        {/* Code Editor */}
        <View style={styles.codeEditorContainer}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>debug_example.js</Text>
            <View style={styles.editorActions}>
              <TouchableOpacity style={styles.editorButton}>
                <Icon name="copy" size={18} color={Colors.primary} />
                <Text style={styles.editorButtonText}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editorButton}>
                <Icon name="save" size={18} color={Colors.primary} />
                <Text style={styles.editorButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.codeContainer}>
            {/* Line Numbers */}
            <ScrollView style={styles.lineNumbers} showsVerticalScrollIndicator={false}>
              {Array.from({ length: 15 }).map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.lineNumber,
                    breakpoints.includes(i + 1) && styles.breakpointLine
                  ]}
                  onPress={() => handleAddBreakpoint(i + 1)}
                >
                  <Text style={[
                    styles.lineNumberText,
                    breakpoints.includes(i + 1) && styles.breakpointLineText
                  ]}>
                    {i + 1}
                  </Text>
                  {breakpoints.includes(i + 1) && (
                    <Icon name="pause-circle" size={12} color={Colors.error} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Code Area */}
            <ScrollView style={styles.codeArea} showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.codeInput}
                multiline
                value={codeInput}
                onChangeText={setCodeInput}
                autoCapitalize="none"
                autoCorrect={false}
                textAlignVertical="top"
              />
            </ScrollView>
          </View>
        </View>

        {/* Debug Controls */}
        <View style={styles.debugControls}>
          <Text style={styles.controlsTitle}>Debug Controls</Text>
          <View style={styles.controlsGrid}>
            {debugTools.map((tool, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.controlButton,
                  tool.title === 'Run' && styles.runButton,
                  tool.title === 'Pause' && styles.pauseButton,
                  tool.title === 'Stop' && styles.stopButton,
                ]}
                onPress={tool.title === 'Run' ? handleRun : undefined}
              >
                <Icon name={tool.icon} size={22} color={Colors.white} />
                <Text style={styles.controlText}>{tool.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Speed Control */}
          <View style={styles.speedControl}>
            <Text style={styles.speedLabel}>Speed: {executionSpeed}x</Text>
            <View style={styles.speedSlider}>
              {[0.5, 1, 2, 4].map((speed) => (
                <TouchableOpacity
                  key={speed}
                  style={[
                    styles.speedOption,
                    executionSpeed === speed && styles.speedOptionActive
                  ]}
                  onPress={() => setExecutionSpeed(speed)}
                >
                  <Text style={[
                    styles.speedText,
                    executionSpeed === speed && styles.speedTextActive
                  ]}>
                    {speed}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Debugging Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScroll}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  activeTab === tab.id && styles.tabButtonActive
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Icon 
                  name={tab.icon} 
                  size={18} 
                  color={activeTab === tab.id ? Colors.white : Colors.primary} 
                />
                <Text style={[
                  styles.tabButtonText,
                  activeTab === tab.id && styles.tabButtonTextActive
                ]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {renderTabContent()}
        </View>

        {/* Common Issues */}
        <View style={styles.issuesContainer}>
          <Text style={styles.sectionTitle}>Common Issues</Text>
          {commonIssues.map((issue, index) => (
            <TouchableOpacity key={index} style={styles.issueCard}>
              <View style={styles.issueHeader}>
                <View style={styles.issueIcon}>
                  <Icon name="bug" size={20} color={Colors.error} />
                </View>
                <View style={styles.issueContent}>
                  <Text style={styles.issueTitle}>{issue.title}</Text>
                  <Text style={styles.issueDescription}>{issue.description}</Text>
                </View>
              </View>
              <Text style={styles.issueFix}>Fix: {issue.fix}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="document-text" size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="share" size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>Share Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="download" size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>Export Logs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 25,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 10,
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
  },
  codeEditorContainer: {
    backgroundColor: Colors.white,
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.primary + '10',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  editorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  editorActions: {
    flexDirection: 'row',
  },
  editorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  editorButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.primary,
  },
  codeContainer: {
    flexDirection: 'row',
    minHeight: 250,
  },
  lineNumbers: {
    width: 50,
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: Colors.lightGray,
  },
  lineNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  breakpointLine: {
    backgroundColor: Colors.error + '20',
  },
  lineNumberText: {
    fontSize: 12,
    color: Colors.gray,
    marginRight: 2,
  },
  breakpointLineText: {
    color: Colors.error,
    fontWeight: 'bold',
  },
  codeArea: {
    flex: 1,
  },
  codeInput: {
    padding: 15,
    fontSize: 14,
    fontFamily: 'monospace',
    color: Colors.primary,
    minHeight: 250,
  },
  debugControls: {
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  controlButton: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  runButton: {
    backgroundColor: Colors.success,
  },
  pauseButton: {
    backgroundColor: Colors.warning,
  },
  stopButton: {
    backgroundColor: Colors.error,
  },
  controlText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  speedControl: {
    marginTop: 10,
  },
  speedLabel: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 10,
  },
  speedSlider: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 25,
    padding: 5,
  },
  speedOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  speedOptionActive: {
    backgroundColor: Colors.secondary,
  },
  speedText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
  },
  speedTextActive: {
    color: Colors.white,
  },
  tabsContainer: {
    backgroundColor: Colors.white,
    margin: 15,
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabsScroll: {
    backgroundColor: Colors.background,
    padding: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  tabButtonTextActive: {
    color: Colors.white,
  },
  tabContent: {
    padding: 15,
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  consoleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  clearButton: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
  },
  consoleOutput: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    maxHeight: 200,
    marginBottom: 10,
  },
  consoleLine: {
    fontSize: 12,
    color: '#d4d4d4',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  consoleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consoleInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.primary,
  },
  sendButton: {
    backgroundColor: Colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  breakpointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  breakpointText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.primary,
  },
  removeButton: {
    backgroundColor: Colors.error,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.gray,
    fontStyle: 'italic',
    padding: 20,
  },
  addBreakpointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.primary,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  variableItem: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  variableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  variableName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  variableType: {
    fontSize: 12,
    color: Colors.secondary,
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  variableValue: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: 'monospace',
  },
  networkRequest: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  requestMethod: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  methodGet: {
    backgroundColor: '#4CAF50' + '30',
  },
  methodPost: {
    backgroundColor: '#2196F3' + '30',
  },
  requestMethodText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  requestDetails: {
    flex: 1,
  },
  requestUrl: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 2,
  },
  requestStatus: {
    fontSize: 12,
  },
  statusSuccess: {
    color: Colors.success,
  },
  statusWarning: {
    color: Colors.warning,
  },
  statusError: {
    color: Colors.error,
  },
  requestTime: {
    fontSize: 12,
    color: Colors.gray,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.gray,
  },
  issuesContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  issueCard: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  issueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  issueContent: {
    flex: 1,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  issueDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  issueFix: {
    fontSize: 14,
    color: Colors.secondary,
    fontFamily: 'monospace',
    backgroundColor: Colors.secondary + '10',
    padding: 10,
    borderRadius: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 5,
  },
});

export default DebuggingScreen;