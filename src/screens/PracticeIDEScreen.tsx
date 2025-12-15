import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

const PracticeIDEScreen = () => {
  const [code, setCode] = useState(`// Write your code here
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("GUVI Learner"));`);
  
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'logo-javascript' },
    { id: 'python', name: 'Python', icon: 'logo-python' },
    { id: 'java', name: 'Java', icon: 'logo-java' },
    { id: 'cpp', name: 'C++', icon: 'code' },
  ];

  const runCode = () => {
    // Simulate code execution
    setOutput('Running code...\nHello, GUVI Learner!\n\nCode executed successfully!');
  };

  const clearCode = () => {
    setCode('// Write your code here\n');
    setOutput('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Practice IDE</Text>
          <Text style={styles.headerSubtitle}>Write, run, and test your code</Text>
        </View>

        {/* Language Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.languageSelector}
        >
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.languageButton,
                language === lang.id && styles.languageButtonActive
              ]}
              onPress={() => setLanguage(lang.id)}
            >
              <Icon 
                name={lang.icon} 
                size={24} 
                color={language === lang.id ? Colors.white : Colors.primary} 
              />
              <Text style={[
                styles.languageText,
                language === lang.id && styles.languageTextActive
              ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Code Editor */}
        <View style={styles.editorContainer}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>Code Editor</Text>
            <View style={styles.editorActions}>
              <TouchableOpacity style={styles.actionButton} onPress={clearCode}>
                <Icon name="trash" size={20} color={Colors.error} />
                <Text style={styles.actionText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={runCode}>
                <Icon name="play" size={20} color={Colors.success} />
                <Text style={styles.actionText}>Run</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.codeInput}
            multiline
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
            textAlignVertical="top"
          />
        </View>

        {/* Output Panel */}
        <View style={styles.outputContainer}>
          <View style={styles.outputHeader}>
            <Text style={styles.outputTitle}>Output</Text>
            <TouchableOpacity onPress={() => setOutput('')}>
              <Icon name="close-circle" size={24} color={Colors.gray} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.outputContent}>
            <Text style={styles.outputText}>
              {output || 'Run your code to see output here...'}
            </Text>
          </ScrollView>
        </View>

        {/* Quick Templates */}
        <View style={styles.templatesContainer}>
          <Text style={styles.templatesTitle}>Quick Templates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Hello World', 'Fibonacci', 'Sort Array', 'Palindrome'].map((template, index) => (
              <TouchableOpacity key={index} style={styles.templateButton}>
                <Text style={styles.templateText}>{template}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 25,
    paddingTop: 40,
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
  languageSelector: {
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    elevation: 2,
  },
  languageButtonActive: {
    backgroundColor: Colors.primary,
  },
  languageText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  languageTextActive: {
    color: Colors.white,
  },
  editorContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.primary,
  },
  codeInput: {
    minHeight: 200,
    padding: 15,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: Colors.primary,
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
  },
  outputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.primary + '10',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  outputContent: {
    maxHeight: 150,
    padding: 15,
  },
  outputText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: Colors.primary,
  },
  templatesContainer: {
    paddingHorizontal: 20,
  },
  templatesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  templateButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    elevation: 2,
  },
  templateText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default PracticeIDEScreen;