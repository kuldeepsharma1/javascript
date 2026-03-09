
class InMemoryDB {
  constructor() {
    this.db = new Map();
    this.valueCounts = new Map();
    this.transactions = []; 
  }

  // --- Core Operations ---

  set(key, value) {
    if (key === undefined || key === null) throw new Error("Key cannot be null or undefined");
    if (value === undefined) throw new Error("Value cannot be undefined");

    this._recordMutation(key);
    this._internalSet(key, value);
  }

  get(key) {
    if (key === undefined || key === null) throw new Error("Key cannot be null or undefined");
    return this.db.has(key) ? this.db.get(key) : null;
  }

  delete(key) {
    if (key === undefined || key === null) throw new Error("Key cannot be null or undefined");
    if (!this.db.has(key)) return false;

    this._recordMutation(key);
    this._internalDelete(key);
    return true;
  }

  count(value) {
    if (value === undefined) return 0;
    return this.valueCounts.get(value) || 0;
  }

  // --- Transaction Support ---

  begin() {
    // Push a new undo log for the current transaction scope
    this.transactions.push(new Map());
  }

  commit() {
    if (this.transactions.length === 0) {
      return "No active transaction";
    }

    // Pop the current transaction log
    const log = this.transactions.pop();

    // If there is a parent transaction, merge the changes upwards
    if (this.transactions.length > 0) {
      const parentLog = this.transactions[this.transactions.length - 1];
      for (const [key, state] of log.entries()) {
        // Only set it in the parent if the parent doesn't already have an older state recorded
        if (!parentLog.has(key)) {
          parentLog.set(key, state);
        }
      }
    }
  }

  rollback() {
    if (this.transactions.length === 0) {
      return "No active transaction";
    }

    const log = this.transactions.pop();
    
    // Revert the database and counts to the state recorded in the undo log
    for (const [key, state] of log.entries()) {
      if (state.exists) {
        this._internalSet(key, state.value);
      } else {
        this._internalDelete(key);
      }
    }
  }

  // --- Internal Helpers ---

  /**
   * Records the state of a key before it is mutated.
   * Only records the FIRST time a key is touched within a specific transaction block.
   */
  _recordMutation(key) {
    if (this.transactions.length === 0) return;
    const currentLog = this.transactions[this.transactions.length - 1];
    
    if (!currentLog.has(key)) {
      currentLog.set(key, { 
        exists: this.db.has(key), 
        value: this.db.get(key) 
      });
    }
  }

  /**
   * Mutates the database and updates value counts directly without logging.
   */
  _internalSet(key, value) {
    if (this.db.has(key)) {
      const oldVal = this.db.get(key);
      if (oldVal === value) return; // Optimization: No change needed
      this._updateCount(oldVal, -1);
    }
    this.db.set(key, value);
    this._updateCount(value, 1);
  }

  /**
   * Deletes a key from the database and updates value counts directly.
   */
  _internalDelete(key) {
    if (!this.db.has(key)) return;
    const oldVal = this.db.get(key);
    this._updateCount(oldVal, -1);
    this.db.delete(key);
  }

  /**
   * Adjusts the reverse-mapping count for a given value to ensure O(1) lookups.
   */
  _updateCount(value, delta) {
    const currentCount = this.valueCounts.get(value) || 0;
    const newCount = currentCount + delta;
    
    if (newCount <= 0) {
      this.valueCounts.delete(value);
    } else {
      this.valueCounts.set(value, newCount);
    }
  }
}

module.exports = InMemoryDB;

// --- Basic Tests ---
// Run these by executing `node mini-db.js` in your terminal.
if (require.main === module) {
  let passed = 0;
  let failed = 0;

  const assertEqual = (actual, expected, testName) => {
    if (actual === expected) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} | Expected: ${expected}, Actual: ${actual}`);
      failed++;
    }
  };

  console.log("--- Starting Tests ---");

  // 1. Core Operations & O(1) Count Test
  const db1 = new InMemoryDB();
  db1.set("a", 10);
  db1.set("b", 10);
  db1.set("c", 20);
  assertEqual(db1.get("a"), 10, "Get existing key");
  assertEqual(db1.get("z"), null, "Get non-existing key returns null");
  assertEqual(db1.count(10), 2, "Count returns correct frequency");
  db1.delete("a");
  assertEqual(db1.count(10), 1, "Count updates correctly after delete");
  assertEqual(db1.get("a"), null, "Key is successfully deleted");

  // 2. Error Handling Test
  try {
    db1.set(null, 5);
    console.error("❌ FAIL: Should throw on null key");
    failed++;
  } catch (e) {
    console.log("✅ PASS: Throws on invalid input");
    passed++;
  }

  // 3. Simple Transaction Test
  const db2 = new InMemoryDB();
  db2.set("a", 10);
  db2.begin();
  db2.set("a", 30);
  assertEqual(db2.get("a"), 30, "Get inside transaction");
  db2.rollback();
  assertEqual(db2.get("a"), 10, "Rollback restores previous state");
  assertEqual(db2.commit(), "No active transaction", "Commit gracefully handles no active transaction");

  // 4. Nested Transaction Test (From Prompt)
  const db3 = new InMemoryDB();
  db3.set("a", 10);
  db3.begin();
  db3.set("a", 20);
  
  db3.begin();
  db3.set("a", 30);
  db3.rollback();
  assertEqual(db3.get("a"), 20, "Nested rollback restores outer transaction state");
  
  db3.commit();
  assertEqual(db3.get("a"), 20, "Commit persists outer transaction state");

  // 5. Delete inside Transaction Test
  const db4 = new InMemoryDB();
  db4.set("x", 100);
  db4.begin();
  db4.delete("x");
  assertEqual(db4.get("x"), null, "Key deleted inside transaction");
  assertEqual(db4.count(100), 0, "Count updated inside transaction");
  db4.rollback();
  assertEqual(db4.get("x"), 100, "Key restored after rollback");
  assertEqual(db4.count(100), 1, "Count restored after rollback");

  console.log(`\n--- Test Summary: ${passed} Passed, ${failed} Failed ---`);
}