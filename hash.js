
class HashMap{
    constructor(capacity = 16, loadFactor = 0.75){
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    };

    set(key,value){
        if(this.size / this.capacity >= this.loadFactor){
            this.resize();
        }
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        for(let pair of bucket){
            if(pair[0] === key){
                pair[1] = value;
                return;
            }
        }
        bucket.push([key,value]);
        this.size++;
    }
    
    get(key){
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        for(let pair of this.buckets[index]){
            if(pair[0] === key)return pair[1];
        }
        return null;
    }

    has(key){
        return this.get(key) !== null;
    }

    remove(key){
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
              bucket.splice(i, 1);
              this.size--;
              return true;
            }
        }
        return false;
    }

    length(){
        return this.size;
    }

    clear(){
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys(){
        return this.buckets.flat().map(pair => pair[0]);
    }

    values(){
        return this.buckets.flat().map(pair => pair[1]);
    }
    
    entries(){
        return this.buckets.flat();
    }

    resize(){
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
        for (let bucket of oldBuckets) {
          for (let [key, value] of bucket) {
            this.set(key, value);
          }
        }
    }

}

const test = new HashMap();