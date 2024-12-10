import { Difficulty, Theme } from '@/types';

const texts: Record<Theme, Record<Difficulty, string[]>> = {
  programming: {
    easy: [
      'const greeting = "Hello, World!"; // A simple JavaScript statement that assigns the string "Hello, World!" to the variable greeting.',
      'function add(a, b) { return a + b; } // A function that takes two arguments (a and b) and returns their sum.',
      'let x = 10; x++; // Declares a variable x, assigns it the value 10, and then increments it by 1.',
      'if (true) { console.log("true"); } // A conditional statement that executes the code inside the curly braces if the condition (true) is met.  This will print "true" to the console.',
      'for (let i = 0; i < 5; i++) { console.log(i); } // A loop that iterates 5 times, printing the value of i (0, 1, 2, 3, 4) to the console in each iteration.'
    ],
    medium: [
      'const fibonacci = n => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); // A recursive function to calculate the nth Fibonacci number.',
      'class User { constructor(name) { this.name = name; } } // A simple class definition for a User object with a constructor that takes a name as an argument.',
      'function factorial(n) { if (n === 0) return 1; else return n * factorial(n - 1); } // A recursive function to calculate the factorial of a number.',
      'const array = [1, 2, 3, 4, 5]; const sum = array.reduce((a, b) => a + b, 0); // Calculates the sum of elements in an array using the reduce method.',
      'const obj = { name: "John", age: 30 }; console.log(obj.name); // Accesses and prints the "name" property of a JavaScript object.'
    ],
    hard: [
      'const quickSort = arr => arr.length <= 1 ? arr : [...quickSort(arr.slice(1).filter(x => x <= arr[0])), arr[0], ...quickSort(arr.slice(1).filter(x => x > arr[0]))]; // A concise implementation of the QuickSort algorithm using recursion and array manipulation.',
      'function mergeSort(arr) { if (arr.length <= 1) return arr; const mid = Math.floor(arr.length / 2); const left = arr.slice(0, mid); const right = arr.slice(mid); return merge(mergeSort(left), mergeSort(right)); } function merge(left, right) { ... } // An implementation of the MergeSort algorithm, showing the splitting and merging steps.  The merge function is omitted for brevity.',
      'const graph = { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] }; function depthFirstSearch(graph, start) { ... } // Represents a graph data structure and declares a depth-first search function (implementation omitted).',
      'const tree = { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } }; function breadthFirstSearch(tree) { ... } // Represents a binary tree and declares a breadth-first search function (implementation omitted).',
      'Implement a binary search tree. // A description of a task to implement a binary search tree data structure.'
    ],
  },
  literature: {
    easy: [
      "The quick brown fox jumps over the lazy dog. This simple sentence is often used to demonstrate the use of all the letters of the alphabet.",
      "To be or not to be, that is the question.  This famous line from Hamlet explores the fundamental human dilemma of life and death.",
      "A stitch in time saves nine. This proverb emphasizes the importance of addressing problems early to prevent larger issues later on.",
      "All that glitters is not gold. This proverb warns against superficial appearances and the importance of looking beyond the surface.",
      "A bird in the hand is worth two in the bush. This proverb highlights the value of appreciating what one already possesses rather than risking it for something potentially better."
    ],
    medium: [
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness. This opening line from A Tale of Two Cities sets a contrasting tone and introduces the complexities of the era.",
      "Pride and prejudice are two very common human emotions. This statement introduces a central theme of the novel Pride and Prejudice, exploring the complexities of human relationships.",
      "The rain in Spain falls mainly on the plain. This tongue twister is a classic example of alliteration and emphasizes the sounds of the words.",
      "She sells seashells by the seashore. This tongue twister is another classic example of alliteration and emphasizes the sounds of the words.",
      "Peter Piper picked a peck of pickled peppers. This tongue twister is yet another classic example of alliteration and emphasizes the sounds of the words.  It's a playful exploration of phonetic patterns."
    ],
    hard: [
      "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. This opening passage from The Hobbit establishes the setting and introduces the protagonist's comfortable lifestyle.",
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. This opening line from Moby Brick immediately draws the reader into the narrative and sets a tone of adventure and introspection.",
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. This opening line from Pride and Prejudice introduces a central theme of the novel and sets the stage for the social dynamics of the story.",
      "A long time ago, in a galaxy far, far away... This iconic opening line from Star Wars immediately transports the audience to a fantastical world of adventure and heroism.",
      "The wind whispered secrets through the tall grass, carrying the scent of rain and the promise of a new dawn. This evocative sentence creates a vivid image and sets a peaceful, hopeful tone.  The use of personification adds depth to the imagery."
    ]
  },
  quotes: {
    easy: [
      'Be the change you wish to see in the world.',
      'Stay hungry, stay foolish.',
      'The only way to do great work is to love what you do.',
      'Believe you can and you’re halfway there.',
      'The journey of a thousand miles begins with a single step.',
      'Do something today that your future self will thank you for.',
      'Happiness is not something ready made. It comes from your own actions.',
      'You miss 100% of the shots you don’t take.',
      'I have not failed. I’ve just found 10,000 ways that won’t work.',
      'You are never too old to set another goal or to dream a new dream.',
      'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', //Added quote
      'Life is not a matter of holding good cards, but of playing a poor hand well.', //Added quote
      'The only person you are destined to become is the person you decide to be.',//Added quote
      'The future belongs to those who believe in the beauty of their dreams.', //Added quote
      'Keep your face always toward the sunshine, and shadows will fall behind you.', //Added quote
      'What lies behind us and what lies in front of us, pales in comparison to what lies inside us.', //Added quote
      'The greatest glory in living lies not in never falling, but in rising every time we fall.', //Added quote
      'The only way to do great work is to love what you do.', //Added quote (duplicate for demonstration)

    ],
    medium: [
      "The only way to do great work is to love what you do.  This simple truth, often overlooked in the pursuit of success, underscores the importance of passion and dedication.  When we find joy in our endeavors, our work transcends mere obligation and becomes a source of fulfillment, leading to greater creativity and productivity.  It's not just about the destination, but the journey itself, and loving the process makes all the difference.",
      "The mind is everything. What you think you become. This profound statement highlights the power of our thoughts to shape our reality.  Our beliefs, both conscious and subconscious, influence our actions, decisions, and ultimately, our destiny.  Cultivating positive and empowering thoughts is crucial for personal growth and achieving our goals.  Negative self-talk, on the other hand, can be a significant obstacle to overcome.",
      "Life is what happens when you’re busy making other plans. This insightful observation reminds us that life is full of unexpected twists and turns.  While planning is essential, it's equally important to be adaptable and embrace the unexpected.  Sometimes, the most rewarding experiences arise from detours and unplanned events.  The key is to maintain a sense of flexibility and openness to new possibilities.",
      "The only limit to our realization of tomorrow will be our doubts of today. This powerful statement emphasizes the self-limiting nature of doubt and fear.  Our beliefs about our capabilities significantly impact our potential for success.  Overcoming self-doubt requires courage, self-belief, and a willingness to step outside our comfort zones.  By challenging our limiting beliefs, we unlock our true potential.",
      "You can’t start the next chapter of your life if you keep re-reading the last one. This poignant reminder encourages us to let go of the past and move forward.  Holding onto past hurts, regrets, or failures can prevent us from embracing new opportunities and experiences.  Healing from past trauma and accepting life's lessons is crucial for personal growth and creating a fulfilling future.",
      "The best way to predict your future is to create it. This empowering statement emphasizes the importance of proactive behavior.  Rather than passively waiting for things to happen, we have the power to shape our own destinies.  Setting clear goals, making deliberate choices, and taking consistent action are essential for creating the future we desire.",
      "Don’t watch the clock; do what it does. Keep going. This motivational message encourages perseverance and resilience.  Success rarely comes easily; it requires consistent effort, dedication, and a refusal to give up in the face of challenges.  Maintaining momentum and staying focused on our goals is crucial for achieving long-term success.",
      "You are stronger than you seem, braver than you believe, and smarter than you think. This uplifting message reminds us of our inner strength and resilience.  We often underestimate our capabilities, but within each of us lies a wellspring of untapped potential.  By believing in ourselves and pushing our boundaries, we can achieve remarkable things.",
      "The biggest adventure you can take is to live the life of your dreams. This inspiring statement encourages us to pursue our passions and live authentically.  Too often, we settle for less than we deserve, allowing fear and self-doubt to hold us back.  Embracing our dreams and taking risks is essential for creating a life filled with purpose and fulfillment.",
      "The unexamined life is not worth living. This philosophical statement encourages self-reflection and introspection.  Understanding ourselves, our values, and our motivations is crucial for living a meaningful life.  Taking time for self-reflection allows us to gain clarity, make informed decisions, and live in alignment with our true selves."
    ],
    hard: [
      "The arc of the moral universe is long, but it bends toward justice.  This seemingly simple aphorism encapsulates a profound truth about the inherent struggle between good and evil, suggesting an ultimate triumph of righteousness despite the often-protracted and arduous journey.  It speaks to the enduring power of hope and the unwavering belief in the eventual prevalence of ethical principles, even amidst seemingly insurmountable obstacles and pervasive injustice.",
      "The unexamined life is not worth living.  This Socratic dictum compels us to engage in rigorous self-reflection and critical analysis of our beliefs, values, and actions.  It underscores the importance of introspection and the pursuit of knowledge as essential components of a meaningful existence.  Failure to engage in such introspection leads to a life devoid of purpose and genuine understanding, a life lived in a state of intellectual and moral inertia.",
      "Cogito, ergo sum.  This foundational principle of Cartesian philosophy, meaning 'I think, therefore I am,' asserts the undeniable existence of the self through the act of consciousness.  It establishes a bedrock of certainty in a world often characterized by doubt and uncertainty, providing a starting point for epistemological inquiry and the construction of knowledge.  Its implications extend far beyond the realm of philosophy, impacting various fields of thought and inquiry.",
      "The only way to do great work is to love what you do. This seemingly simple statement belies a profound truth about the nature of human motivation and achievement.  It suggests that intrinsic motivation, driven by passion and genuine interest, is far more effective than extrinsic rewards in fostering creativity, productivity, and overall fulfillment.  It underscores the importance of aligning one's work with one's values and passions, leading to a more meaningful and rewarding life.",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. This inspirational maxim emphasizes the importance of resilience, perseverance, and the ability to learn from setbacks.  It suggests that failure is not an insurmountable obstacle but rather an opportunity for growth and self-improvement.  It encourages a growth mindset, emphasizing the importance of embracing challenges and viewing adversity as a catalyst for personal development.",
      "The future belongs to those who believe in the beauty of their dreams. This optimistic assertion underscores the power of hope, vision, and unwavering belief in the possibility of achieving one's aspirations.  It suggests that the pursuit of dreams, however ambitious, is essential for personal growth and societal progress.  It encourages individuals to cultivate a positive outlook and to persevere in the face of adversity, believing in the transformative power of their aspirations.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. This motivational aphorism highlights the importance of perseverance, resilience, and the unwavering commitment to one's goals.  It suggests that setbacks are inevitable but should not be interpreted as definitive conclusions.  Rather, they should be viewed as opportunities for learning, growth, and renewed determination.  It emphasizes the crucial role of courage in overcoming obstacles and achieving long-term success.",
      "The only limit to our realization of tomorrow will be our doubts of today. This profound statement emphasizes the self-limiting nature of doubt and fear.  Our beliefs about our capabilities significantly impact our potential for success.  Overcoming self-doubt requires courage, self-belief, and a willingness to step outside our comfort zones.  By challenging our limiting beliefs, we unlock our true potential.  This requires introspection, self-awareness, and a commitment to personal growth.  It is a continuous process of self-discovery and self-improvement, requiring consistent effort and dedication.",
      "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; No more; and by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to: 'tis a consummation devoutly to be wish'd. To die, to sleep; To sleep: perchance to dream: ay, there's the rub; For in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause: there's the respect that makes calamity of so long life; For who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of despised love, the law's delay, the insolence of office and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will and makes us rather bear those ills we have than fly to others that we know not of? Thus conscience does make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action.—Soft you now! The fair Ophelia! Nymph, in thy orisons be all my sins remember'd."
    ],
  },
};

export const getRandomText = (theme: Theme, difficulty: Difficulty): string => {
  const themeTexts = texts[theme][difficulty];
  return themeTexts[Math.floor(Math.random() * themeTexts.length)];
};