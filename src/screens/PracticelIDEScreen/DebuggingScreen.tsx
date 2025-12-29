import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface DebuggingProblem {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
  solution: string;
  points: number;
}

const DebuggingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [showHints, setShowHints] = useState<boolean[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  const debuggingProblems: DebuggingProblem[] = [
    {
      id: '1',
      title: 'Syntax Error in Function',
      description: 'Find and fix the syntax error in this JavaScript function that should calculate the sum of an array.',
      code: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length i++) {
    sum += arr[i];
  }
  return sum;
}

// Expected output for [1, 2, 3] should be 6`,
      language: 'JavaScript',
      difficulty: 'Easy',
      hints: [
        'Check the for loop syntax',
        'Look for missing punctuation',
        'The issue is in the loop condition'
      ],
      solution: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
      points: 10
    },
    {
      id: '2',
      title: 'Infinite Loop',
      description: 'Fix the infinite loop in this code that should print numbers from 1 to 10.',
      code: `function printNumbers() {
  let i = 1;
  while (i <= 10) {
    console.log(i);
  }
}`,
      language: 'JavaScript',
      difficulty: 'Easy',
      hints: [
        'The variable i is not being incremented',
        'Check what changes inside the loop',
        'You need to update i in each iteration'
      ],
      solution: `function printNumbers() {
  let i = 1;
  while (i <= 10) {
    console.log(i);
    i++; // Added this line
  }
}`,
      points: 15
    },
    {
      id: '3',
      title: 'Array Index Error',
      description: 'Fix the array index out of bounds error in this function.',
      code: `function getLastElement(arr) {
  return arr[arr.length];
}`,
      language: 'JavaScript',
      difficulty: 'Medium',
      hints: [
        'Array indices start from 0',
        'What is the index of the last element?',
        'Use arr.length - 1'
      ],
      solution: `function getLastElement(arr) {
  return arr[arr.length - 1];
}`,
      points: 20
    },
  ];

  const currentProblem = debuggingProblems[currentProblemIndex];

  useEffect(() => {
    // Initialize hints visibility array
    setShowHints(new Array(currentProblem.hints.length).fill(false));
    setUserSolution(currentProblem.code);
    setShowSolution(false);
  }, [currentProblemIndex]);

  const handleNextProblem = () => {
    if (currentProblemIndex < debuggingProblems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
    } else {
      Alert.alert('Congratulations!', 'You have completed all debugging problems!');
    }
  };

  const handlePreviousProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(prev => prev - 1);
    }
  };

  const toggleHint = (index: number) => {
    const newHints = [...showHints];
    newHints[index] = !newHints[index];
    setShowHints(newHints);
  };

  const checkSolution = () => {
    setIsLoading(true);
    
    // Simulate API call or solution checking
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation - in real app, you'd have more sophisticated checking
      if (userSolution.trim() === currentProblem.solution.trim()) {
        Alert.alert(
          'Correct! 🎉',
          `Great job! You earned ${currentProblem.points} points!`,
          [
            {
              text: 'Continue',
              onPress: () => {
                if (!completedProblems.includes(currentProblem.id)) {
                  setScore(prev => prev + currentProblem.points);
                  setCompletedProblems(prev => [...prev, currentProblem.id]);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Not Quite Right',
          'Keep trying! Check your solution against the hints.',
          [
            { text: 'Try Again' },
            { 
              text: 'Show Solution',
              onPress: () => setShowSolution(true)
            }
          ]
        );
      }
    }, 1000);
  };

  const resetProblem = () => {
    setUserSolution(currentProblem.code);
    setShowHints(new Array(currentProblem.hints.length).fill(false));
    setShowSolution(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.mainHeading}>Debugging Practice</Text>
            <Text style={styles.subHeading}>Find and fix the bugs</Text>
          </View>
        </View>

        {/* Progress and Score */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{currentProblemIndex + 1}/{debuggingProblems.length}</Text>
            <Text style={styles.statLabel}>Problems</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{score}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: getDifficultyColor(currentProblem.difficulty) }]}>
              {currentProblem.difficulty}
            </Text>
            <Text style={styles.statLabel}>Difficulty</Text>
          </View>
        </View>

        {/* Problem Card */}
        <View style={styles.card}>
          <View style={styles.problemHeader}>
            <Text style={styles.problemTitle}>{currentProblem.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(currentProblem.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(currentProblem.difficulty) }]}>
                {currentProblem.difficulty}
              </Text>
            </View>
          </View>
          
          <Text style={styles.problemDescription}>{currentProblem.description}</Text>
          
          <View style={styles.languageTag}>
            <Icon name="code" size={16} color="#002e6e" />
            <Text style={styles.languageText}>{currentProblem.language}</Text>
          </View>

          {/* Code Editor */}
          <View style={styles.codeContainer}>
            <View style={styles.codeHeader}>
              <Text style={styles.codeHeaderText}>Buggy Code</Text>
              <Text style={styles.codeHint}>Find and fix the error(s)</Text>
            </View>
            <TextInput
              style={styles.codeInput}
              value={userSolution}
              onChangeText={setUserSolution}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
              editable={!showSolution}
            />
          </View>

          {/* Hints Section */}
          <View style={styles.hintsContainer}>
            <Text style={styles.hintsTitle}>Hints ({showHints.filter(h => h).length}/{currentProblem.hints.length})</Text>
            {currentProblem.hints.map((hint, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hintItem}
                onPress={() => toggleHint(index)}
              >
                <View style={styles.hintHeader}>
                  <Icon 
                    name={showHints[index] ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#002e6e" 
                  />
                  <Text style={styles.hintNumber}>Hint {index + 1}</Text>
                </View>
                {showHints[index] && (
                  <Text style={styles.hintText}>{hint}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.checkButton]}
              onPress={checkSolution}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Icon name="check-circle" size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Check Solution</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.resetButton]}
              onPress={resetProblem}
            >
              <Icon name="refresh" size={20} color="#002e6e" />
              <Text style={[styles.actionButtonText, { color: '#002e6e' }]}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Solution (when shown) */}
          {showSolution && (
            <View style={styles.solutionContainer}>
              <Text style={styles.solutionTitle}>Correct Solution</Text>
              <View style={styles.solutionCode}>
                <Text style={styles.solutionText}>{currentProblem.solution}</Text>
              </View>
            </View>
          )}

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton, currentProblemIndex === 0 && styles.disabledButton]}
              onPress={handlePreviousProblem}
              disabled={currentProblemIndex === 0}
            >
              <Icon name="arrow-back" size={20} color={currentProblemIndex === 0 ? "#94a3b8" : "#002e6e"} />
              <Text style={[styles.navButtonText, currentProblemIndex === 0 && styles.disabledText]}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNextProblem}
            >
              <Text style={styles.navButtonText}>
                {currentProblemIndex === debuggingProblems.length - 1 ? 'Finish' : 'Next Problem'}
              </Text>
              <Icon name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Bottom padding for better scrolling */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getDifficultyColor = (difficulty: string) => {
  switch(difficulty) {
    case 'Easy': return '#10B981';
    case 'Medium': return '#F59E0B';
    case 'Hard': return '#EF4444';
    default: return '#002e6e';
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
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
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    marginRight: 15,
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    lineHeight: 16,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  problemTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginRight: 12,
    lineHeight: 28,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  problemDescription: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  languageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  languageText: {
    fontSize: 14,
    color: '#002e6e',
    fontWeight: '600',
    marginLeft: 6,
    lineHeight: 20,
  },
  codeContainer: {
    marginBottom: 20,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 24,
  },
  codeHint: {
    fontSize: 14,
    color: '#64748B',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  codeInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#1E293B',
    minHeight: 180,
    lineHeight: 24,
  },
  hintsContainer: {
    marginBottom: 20,
  },
  hintsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 24,
  },
  hintItem: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  hintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hintNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002e6e',
    marginLeft: 10,
    lineHeight: 22,
  },
  hintText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginLeft: 30,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  checkButton: {
    backgroundColor: '#002e6e',
  },
  resetButton: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#002e6e',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  solutionContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#002e6e',
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 24,
  },
  solutionCode: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  solutionText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#1E293B',
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 10,
  },
  prevButton: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  nextButton: {
    backgroundColor: '#002e6e',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#94a3b8',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  bottomPadding: {
    height: 20,
  },
});

export default DebuggingScreen;