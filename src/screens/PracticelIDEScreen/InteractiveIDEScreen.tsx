import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

const InteractiveIDEScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState<string | null>(null);
  const textInputRef = useRef<TextInput>(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'js' },
    { id: 'python', name: 'Python', icon: 'python' },
    { id: 'java', name: 'Java', icon: 'coffee' },
    { id: 'cpp', name: 'C++', icon: 'c-plus-plus' },
    { id: 'html', name: 'HTML/CSS', icon: 'html5' },
  ];

  const codeSnippets: CodeSnippet[] = [
    {
      id: '1',
      title: 'Hello World',
      language: 'javascript',
      code: `console.log("Hello, World!");`,
      description: 'Basic console output in JavaScript'
    },
    {
      id: '2',
      title: 'Factorial Function',
      language: 'javascript',
      code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120`,
      description: 'Recursive factorial calculation'
    },
    {
      id: '3',
      title: 'Array Operations',
      language: 'javascript',
      code: `// Map, Filter, Reduce examples
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Sum all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`,
      description: 'Common array operations in JavaScript'
    },
    {
      id: '4',
      title: 'FizzBuzz',
      language: 'javascript',
      code: `for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}`,
      description: 'Classic FizzBuzz problem'
    },
    {
      id: '5',
      title: 'Palindrome Check',
      language: 'javascript',
      code: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleanStr.split('').reverse().join('');
  return cleanStr === reversed;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false`,
      description: 'Check if a string is a palindrome'
    }
  ];

  const languageTemplates: Record<string, string> = {
    javascript: `// Write your JavaScript code here
console.log("Hello from JavaScript!");

function example() {
  return "This is a function";
}

console.log(example());`,
    python: `# Write your Python code here
print("Hello from Python!")

def example():
    return "This is a function"

print(example())`,
    java: `// Write your Java code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`,
    cpp: `// Write your C++ code here
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`,
    html: `<!-- Write your HTML/CSS code here -->
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        .container {
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Edit this HTML to see changes</p>
    </div>
</body>
</html>`
  };

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    setCode(languageTemplates[langId] || '');
    setOutput('');
    setActiveSnippet(null);
  };

  const handleSnippetSelect = (snippet: CodeSnippet) => {
    if (snippet.language !== selectedLanguage) {
      setSelectedLanguage(snippet.language);
    }
    setCode(snippet.code);
    setActiveSnippet(snippet.id);
    setOutput('');
  };

  const runCode = () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please write some code first');
      return;
    }

    setIsRunning(true);
    setOutput('Running...\n');

    // Simulate code execution
    setTimeout(() => {
      try {
        // Simple JavaScript execution simulation
        if (selectedLanguage === 'javascript') {
          const mockOutput = executeJavaScript(code);
          setOutput(`✓ Code executed successfully!\n\n${mockOutput}`);
        } else {
          setOutput(`✓ ${selectedLanguage.toUpperCase()} code would execute here\n\n(Note: This is a simulation. In a real app, this would connect to a code execution API)`);
        }
      } catch (error: any) {
        setOutput(`✗ Error: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  const executeJavaScript = (codeString: string): string => {
    // Simple mock execution for demonstration
    const lines = codeString.split('\n');
    let output = '';
    
    lines.forEach(line => {
      if (line.includes('console.log(')) {
        const content = line.match(/console\.log\(([^)]+)\)/);
        if (content) {
          output += `${content[1].replace(/["']/g, '')}\n`;
        }
      }
    });
    
    return output || 'Program executed with no console output';
  };

  const clearCode = () => {
    Alert.alert(
      'Clear Code',
      'Are you sure you want to clear the editor?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            setCode(languageTemplates[selectedLanguage] || '');
            setOutput('');
            setActiveSnippet(null);
          }
        }
      ]
    );
  };

  const saveCode = () => {
    Alert.alert(
      'Save Code',
      'Your code has been saved to practice history!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#002e6e" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.mainHeading}>Interactive IDE</Text>
              <Text style={styles.subHeading}>Write, run, and test code instantly</Text>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={saveCode}>
              <Icon name="save" size={24} color="#002e6e" />
            </TouchableOpacity>
          </View>

          {/* Language Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.languageSelector}
            contentContainerStyle={styles.languageSelectorContent}
          >
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang.id && styles.languageButtonActive
                ]}
                onPress={() => handleLanguageSelect(lang.id)}
              >
                <FontAwesome5 
                  name={lang.icon} 
                  size={20} 
                  color={selectedLanguage === lang.id ? '#FFFFFF' : '#002e6e'} 
                />
                <Text style={[
                  styles.languageButtonText,
                  selectedLanguage === lang.id && styles.languageButtonTextActive
                ]}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Start Snippets */}
          <View style={styles.snippetsContainer}>
            <Text style={styles.sectionTitle}>Quick Start Examples</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.snippetsContent}
            >
              {codeSnippets
                .filter(snippet => snippet.language === selectedLanguage)
                .map((snippet) => (
                  <TouchableOpacity
                    key={snippet.id}
                    style={[
                      styles.snippetCard,
                      activeSnippet === snippet.id && styles.snippetCardActive
                    ]}
                    onPress={() => handleSnippetSelect(snippet)}
                  >
                    <View style={styles.snippetHeader}>
                      <FontAwesome5 
                        name={selectedLanguage === 'python' ? 'python' : 'js'} 
                        size={16} 
                        color="#002e6e" 
                      />
                      <Text style={styles.snippetTitle}>{snippet.title}</Text>
                    </View>
                    <Text style={styles.snippetDescription} numberOfLines={2}>
                      {snippet.description}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Code Editor */}
          <View style={styles.editorContainer}>
            <View style={styles.editorHeader}>
              <Text style={styles.editorTitle}>
                {selectedLanguage.toUpperCase()} Editor
              </Text>
              <TouchableOpacity style={styles.clearButton} onPress={clearCode}>
                <Icon name="delete" size={20} color="#64748B" />
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.codeEditorWrapper}>
              <View style={styles.lineNumbers}>
                {code.split('\n').map((_, index) => (
                  <Text key={index} style={styles.lineNumber}>{index + 1}</Text>
                ))}
              </View>
              <TextInput
                ref={textInputRef}
                style={styles.codeEditor}
                value={code}
                onChangeText={setCode}
                multiline
                numberOfLines={15}
                textAlignVertical="top"
                placeholder={`Write your ${selectedLanguage.toUpperCase()} code here...`}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Run Button */}
          <TouchableOpacity 
            style={styles.runButton}
            onPress={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Icon name="play-arrow" size={24} color="#FFFFFF" />
                <Text style={styles.runButtonText}>Run Code</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Output Console */}
          <View style={styles.outputContainer}>
            <View style={styles.outputHeader}>
              <Icon name="terminal" size={20} color="#1E293B" />
              <Text style={styles.outputTitle}>Output Console</Text>
              <TouchableOpacity 
                style={styles.clearOutputButton}
                onPress={() => setOutput('')}
              >
                <Text style={styles.clearOutputText}>Clear</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.outputConsole}>
              <Text style={styles.outputText} selectable>
                {output || 'Your output will appear here after running the code...'}
              </Text>
            </ScrollView>
            
            <View style={styles.outputStats}>
              <Text style={styles.statsText}>
                Language: {selectedLanguage.toUpperCase()}
              </Text>
              <Text style={styles.statsText}>
                Lines: {code.split('\n').length}
              </Text>
              <Text style={styles.statsText}>
                Characters: {code.length}
              </Text>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Tips for Better Practice</Text>
            <View style={styles.tipItem}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
              <Text style={styles.tipText}>Start with simple examples and gradually increase complexity</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
              <Text style={styles.tipText}>Experiment with different approaches to solve the same problem</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
              <Text style={styles.tipText}>Use console.log() frequently to debug your code</Text>
            </View>
          </View>
          
          {/* Bottom padding for better scrolling */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  saveButton: {
    marginLeft: 15,
    padding: 4,
  },
  headerContent: {
    flex: 1,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  subHeading: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
    marginTop: 4,
  },
  languageSelector: {
    marginBottom: 25,
  },
  languageSelectorContent: {
    gap: 10,
    paddingRight: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    marginRight: 10,
  },
  languageButtonActive: {
    backgroundColor: '#002e6e',
    borderColor: '#002e6e',
  },
  languageButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#002e6e',
    lineHeight: 20,
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
  },
  snippetsContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 15,
    lineHeight: 24,
  },
  snippetsContent: {
    gap: 12,
    paddingRight: 20,
  },
  snippetCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: 180,
    marginRight: 12,
  },
  snippetCardActive: {
    borderColor: '#002e6e',
    backgroundColor: '#F0F9FF',
  },
  snippetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  snippetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
  },
  snippetDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  editorContainer: {
    marginBottom: 20,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 24,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  codeEditorWrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  codeEditor: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    paddingLeft: 60,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#F8FAFC',
    minHeight: 200,
    lineHeight: 24,
    flex: 1,
  },
  lineNumbers: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'flex-end',
    zIndex: 1,
  },
  lineNumber: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#64748B',
    lineHeight: 24,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002e6e',
    paddingVertical: 18,
    borderRadius: 12,
    gap: 12,
    marginBottom: 25,
  },
  runButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  outputContainer: {
    marginBottom: 25,
  },
  outputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  outputTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    lineHeight: 24,
  },
  clearOutputButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearOutputText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  outputConsole: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    maxHeight: 200,
    marginBottom: 12,
  },
  outputText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#F8FAFC',
    lineHeight: 22,
  },
  outputStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statsText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#002e6e',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  tipText: {
    fontSize: 15,
    color: '#475569',
    flex: 1,
    lineHeight: 22,
  },
  bottomPadding: {
    height: 40,
  },
});

export default InteractiveIDEScreen;