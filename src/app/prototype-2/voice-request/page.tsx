'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function VoiceRequestPage() {
  const router = useRouter();
  // Interview questions and state
  const questions = [
    {
      id: 1,
      question: "What type of project are you working on?",
      hint: "For example: \"Highway construction\", \"Commercial building\", \"Residential development\"",
      response: ""
    },
    {
      id: 2,
      question: "What materials do you need and in what quantities?",
      hint: "For example: \"We need 2,500 tons of crushed stone and 1,200 tons of sand\"",
      response: ""
    },
    {
      id: 3,
      question: "When do you need these materials delivered?",
      hint: "For example: \"Starting May 15th with deliveries over 3 weeks\"",
      response: ""
    },
    {
      id: 4,
      question: "Where is your project located?",
      hint: "For example: \"Springfield, IL between markers 35 and 40\"",
      response: ""
    },
    {
      id: 5,
      question: "What's your contact information?",
      hint: "Please provide your company name, contact name, email, and phone number",
      response: ""
    },
    {
      id: 6,
      question: "Any special requirements or considerations?",
      hint: "For example: \"Site has weight restrictions for vehicles over 30 tons\"",
      response: ""
    }
  ];
  // Current state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(questions.map(q => ({ id: q.id, response: q.response })));
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [progress, setProgress] = useState(17); // 17% for first question (1/6)
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState("voice"); // "voice" or "typing"
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const textareaRef = useRef(null);
  // Speech recognition reference
  const recognitionRef = useRef(null);
  // Set up speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
        // Only create the recognition instance if it doesn't exist yet
        if (!recognitionRef.current) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false; // Changed to false to avoid keeping old values
          recognitionRef.current.interimResults = false; // Changed to false for better reliability
          recognitionRef.current.lang = 'en-US';
          recognitionRef.current.onresult = (event) => {
            if (event.results && event.results.length > 0) {
              // Only take the final result
              const finalResult = event.results[event.results.length - 1];
              if (finalResult.isFinal) {
                const transcript = finalResult[0].transcript;
                // Don't append, replace the transcription
                setTranscription(transcript);
              }
            }
          };
          recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setError(`Error: ${event.error}. Try typing instead.`);
            setIsListening(false);
          };
          recognitionRef.current.onend = () => {
            setIsListening(false);
          };
        }
      } else {
        setRecognitionSupported(false);
        setInputMode("typing"); // Default to typing mode instead
        setError("Browser doesn't support native speech recognition. Please use typing mode.");
      }
    }
    return () => {
      try {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
        }
      } catch (err) {
        console.error("Error cleaning up speech recognition:", err);
      }
    };
  }, []);
  // Start/stop speech recognition
  const toggleSpeechRecognition = () => {
    // Guard against trying to start recognition when it's already running
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (err) {
        console.error("Error stopping speech recognition:", err);
      }
      setIsListening(false);
    } else {
      setError("");
      setTranscription(""); // Clear previous transcript
      try {
        // Check if recognition instance needs to be recreated
        if (!recognitionRef.current) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // Set to false to avoid keeping old results
            recognitionRef.current.interimResults = false; // Set to false for better reliability
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.onresult = (event) => {
              if (event.results && event.results.length > 0) {
                // Just use the latest result
                const finalResult = event.results[event.results.length - 1];
                const transcript = finalResult[0].transcript;
                setTranscription(transcript);
              }
            };
            recognitionRef.current.onerror = (event) => {
              console.error('Speech recognition error', event.error);
              setError(`Error: ${event.error}. Try typing instead.`);
              setIsListening(false);
            };
            recognitionRef.current.onend = () => {
              setIsListening(false);
            };
          }
        }
        // Reset the recognition instance
        if (recognitionRef.current) {
          // Create a new instance each time to avoid issues with previous results
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';
          recognitionRef.current.onresult = (event) => {
            if (event.results && event.results.length > 0) {
              const finalResult = event.results[event.results.length - 1];
              const transcript = finalResult[0].transcript;
              setTranscription(transcript);
            }
          };
          recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setError(`Error: ${event.error}. Try typing instead.`);
            setIsListening(false);
          };
          recognitionRef.current.onend = () => {
            setIsListening(false);
          };
          recognitionRef.current.start();
          setIsListening(true);
        }
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setError("Failed to start speech recognition. Please try typing instead.");
        setInputMode("typing");
      }
    }
  };
  // Handle typing input
  const handleTypingInput = (e) => {
    setTranscription(e.target.value);
  };
  // Toggle between voice and typing modes
  const toggleInputMode = () => {
    if (inputMode === "voice") {
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
      setInputMode("typing");
      // Focus on textarea when switching to typing
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } else {
      setInputMode("voice");
    }
  };
  // Handle moving to the next question
  const handleNextQuestion = () => {
    // Save current response
    setResponses(prev => 
      prev.map(r => r.id === questions[currentQuestionIndex].id 
        ? { ...r, response: transcription } 
        : r
      )
    );
    // If we're at the last question, submit all responses
    if (currentQuestionIndex === questions.length - 1) {
      // Store all responses in session storage for the review page
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = {
        ...updatedResponses[currentQuestionIndex],
        response: transcription
      };
      sessionStorage.setItem('voiceResponses', JSON.stringify(updatedResponses));
      router.push('/prototype-2/review');
    } else {
      // Move to next question and reset transcription
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTranscription("");
      // Stop current recognition
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
      setProgress((currentQuestionIndex + 2) * (100 / questions.length)); // Update progress percentage
      // Reset to voice mode for next question if user switched to typing
      if (inputMode === "typing" && recognitionSupported) {
        setInputMode("voice");
      }
    }
  };
  // Retry current question
  const handleRetry = () => {
    setTranscription("");
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    setError("");
  };
  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-2" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 2
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Voice Quote Request</h1>
            <p className="text-center mb-4 text-gray-600 dark:text-gray-300">
              {inputMode === "voice" 
                ? "Tell us about your project and material needs using your voice" 
                : "Type your response to continue"}
            </p>
            {inputMode === "voice" && recognitionSupported && (
              <p className="text-center mb-8 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <span className="inline-flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Using browser speech recognition
                </span>
              </p>
            )}
            {/* Voice Interview Container */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
              {/* Current Question Display */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current question:</p>
                <h2 className="text-xl font-medium">{questions[currentQuestionIndex].question}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {questions[currentQuestionIndex].hint}
                </p>
              </div>
              {/* Input Mode Toggle */}
              <div className="flex justify-center mb-6">
                <button 
                  className={`px-4 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                    inputMode === "voice" 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => recognitionSupported ? setInputMode("voice") : null}
                  disabled={!recognitionSupported}
                >
                  Voice
                </button>
                <button 
                  className={`px-4 py-2 rounded-r-lg text-sm font-medium transition-colors ${
                    inputMode === "typing" 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setInputMode("typing")}
                >
                  Typing
                </button>
              </div>
              {inputMode === "voice" ? (
                /* Voice Input Area */
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
                  <div className="relative">
                    <button 
                      onClick={toggleSpeechRecognition}
                      className={`w-24 h-24 bg-primary bg-opacity-10 dark:bg-opacity-20 rounded-full flex items-center justify-center 
                        ${isListening ? 'animate-pulse' : ''} 
                        mb-4 focus:outline-none`}
                    >
                      <div className="w-20 h-20 bg-primary bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </button>
                    {isListening && (
                      <div className="absolute -bottom-1 right-0">
                        <span className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-primary font-medium">
                    {isListening
                      ? "Listening... (click mic to stop)" 
                      : "Click microphone to start"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {isListening
                      ? "Speak your response clearly" 
                      : "Or switch to typing mode below"}
                  </p>
                  {error && (
                    <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                /* Typing Input Area */
                <div className="mb-6">
                  <textarea
                    ref={textareaRef}
                    value={transcription}
                    onChange={handleTypingInput}
                    placeholder="Type your response here..."
                    className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={6}
                  ></textarea>
                </div>
              )}
              {/* Transcription Display - only show if there's content or in voice mode */}
              {(transcription || inputMode === "voice") && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {inputMode === "voice" ? "We heard:" : "Your response:"}
                  </p>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="italic">{transcription || "Waiting for your response..."}</p>
                  </div>
                </div>
              )}
              {/* Voice Controls */}
              <div className="flex justify-center space-x-4">
                <button 
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
                  onClick={handleRetry}
                >
                  Clear & Retry
                </button>
                <button 
                  className={`px-4 py-2 ${transcription ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'} rounded-lg transition-colors text-sm font-medium`}
                  onClick={handleNextQuestion}
                  disabled={!transcription}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next Question"}
                </button>
              </div>
            </div>
            {/* Interview Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            {/* Questions Preview */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Questions we'll ask:</h3>
              <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400 list-decimal pl-4">
                {questions.map((q, index) => (
                  <li key={q.id} className={index === currentQuestionIndex ? "text-primary font-medium" : ""}>
                    {q.question}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
            <h3 className="font-medium mb-2">Prefer a traditional form?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              You can still submit a quote request using our standard form.
            </p>
            <Link 
              href="/prototype-1/request"
              className="text-primary hover:underline text-sm font-medium"
            >
              Switch to Form-Based Quote Request
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}