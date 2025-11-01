(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/services/UserService.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
import { apiClient } from '../api/client';
import { userStorage } from '../storage/UserStorage';

class UserService {
  async fetchUsers(size = 10) {
    try {
      const response = await fetch(`/api/users?size=${size}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async saveUser(user) {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return result;
      } else {
        throw new Error(result.message || 'Failed to save user');
      }
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }

  async getSavedUsers() {
    try {
      const response = await fetch('/api/records');
      if (!response.ok) {
        throw new Error('Failed to fetch saved users');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error getting saved users: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await fetch(`/api/records?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const response = await fetch(`/api/records?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export const userService = new UserService();*/ // /lib/services/UserService.js
__turbopack_context__.s([
    "userService",
    ()=>userService
]);
class UserService {
    async fetchUsers(size = 10) {
        try {
            const response = await fetch(`/api/users?size=${size}`);
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }
    async saveUser(user) {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            } else {
                throw new Error(result.message || 'Failed to save user');
            }
        } catch (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }
    }
    async getSavedUsers() {
        try {
            const response = await fetch('/api/records');
            if (!response.ok) {
                throw new Error('Failed to fetch saved users');
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Error getting saved users: ${error.message}`);
        }
    }
    async updateUser(id, userData) {
        try {
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
    async deleteUser(id) {
        try {
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}
const userService = new UserService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useUsers.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /lib/hooks/useUsers.js
__turbopack_context__.s([
    "useUsers",
    ()=>useUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/UserService.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useUsers() {
    _s();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const fetchUsers = async ()=>{
        setLoading(true);
        setError('');
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userService"].fetchUsers(10);
            if (result.success) {
                setUsers(result.data);
            } else {
                setError(result.message || 'Failed to fetch users');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Network error: Unable to fetch users');
        } finally{
            setLoading(false);
        }
    };
    const saveUser = async (user)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userService"].saveUser(user);
        } catch (err) {
            console.error('Error saving user:', err);
            throw err;
        }
    };
    const saveAllUsers = async ()=>{
        setLoading(true);
        try {
            let successCount = 0;
            let errorCount = 0;
            for (const user of users){
                try {
                    await saveUser(user);
                    successCount++;
                } catch (error) {
                    errorCount++;
                }
            }
            alert(`Saved ${successCount} users successfully. ${errorCount > 0 ? `${errorCount} failed.` : ''}`);
        } catch (error) {
            console.error('Error in saveAllUsers:', error);
            alert('Error saving users');
        } finally{
            setLoading(false);
        }
    };
    return {
        users,
        loading,
        error,
        fetchUsers,
        saveUser,
        saveAllUsers
    };
}
_s(useUsers, "NiT5qrPKEtaGpoU9LlRFfZhqD8s=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useSavedUsers.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /lib/hooks/useSavedUsers.js
__turbopack_context__.s([
    "useSavedUsers",
    ()=>useSavedUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/UserService.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSavedUsers() {
    _s();
    const [savedUsers, setSavedUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const fetchSavedUsers = async ()=>{
        try {
            const users = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userService"].getSavedUsers();
            setSavedUsers(users);
        } catch (err) {
            console.error('Error fetching saved users:', err);
            setError('Failed to load saved records');
        }
    };
    const updateSavedUsers = async ()=>{
        await fetchSavedUsers();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSavedUsers.useEffect": ()=>{
            fetchSavedUsers();
        }
    }["useSavedUsers.useEffect"], []);
    return {
        savedUsers,
        error,
        fetchSavedUsers,
        updateSavedUsers
    };
}
_s(useSavedUsers, "txjIJGX7ZYvNqmhuZiRDXCAfekc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/SearchService.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /lib/services/SearchService.js
__turbopack_context__.s([
    "searchService",
    ()=>searchService
]);
class SearchService {
    async searchUsers(query, fields = [
        'first_name',
        'last_name'
    ]) {
        try {
            const fieldParam = fields.join(',');
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&fields=${fieldParam}`);
            if (!response.ok) {
                throw new Error('Search request failed');
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Search error: ${error.message}`);
        }
    }
}
const searchService = new SearchService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useSearch.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /lib/hooks/useSearch.js
__turbopack_context__.s([
    "useSearch",
    ()=>useSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$SearchService$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/SearchService.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSearch() {
    _s();
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSearch = async (query)=>{
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const results = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$SearchService$2e$js__$5b$client$5d$__$28$ecmascript$29$__["searchService"].searchUsers(query, [
                'first_name',
                'last_name',
                'email'
            ]);
            setSearchResults(results);
        } catch (err) {
            console.error('Error searching:', err);
            setError('Search failed');
        }
    };
    return {
        searchResults,
        error,
        handleSearch
    };
}
_s(useSearch, "/p9E3nJ6gInvv2h5xj5A5nAQvWY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// /lib/hooks/index.js
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useUsers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSavedUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useSavedUsers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSearch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useSearch.js [client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/TabNav.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/ui/TabNav.js
__turbopack_context__.s([
    "TabNav",
    ()=>TabNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../styles/components/ui/TabNav.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
function TabNav({ tabs, activeTab, onTabChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: styles.nav,
        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`,
                onClick: ()=>onTabChange(tab.id),
                children: [
                    tab.label,
                    tab.count !== null && ` (${tab.count})`
                ]
            }, tab.id, true, {
                fileName: "[project]/components/ui/TabNav.js",
                lineNumber: 8,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/ui/TabNav.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = TabNav;
var _c;
__turbopack_context__.k.register(_c, "TabNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Button.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/ui/Button.js
__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../styles/components/ui/Button.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
function Button({ children, onClick, disabled, variant = 'primary', ...props }) {
    const className = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: className,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Button.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/SearchForm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/ui/SearchForm.js
__turbopack_context__.s([
    "SearchForm",
    ()=>SearchForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../styles/components/ui/SearchForm.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
function SearchForm({ query, onChange, onSubmit, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        className: styles.searchForm,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: query,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: styles.searchInput
            }, void 0, false, {
                fileName: "[project]/components/ui/SearchForm.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: styles.searchButton,
                children: "Search"
            }, void 0, false, {
                fileName: "[project]/components/ui/SearchForm.js",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/SearchForm.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = SearchForm;
var _c;
__turbopack_context__.k.register(_c, "SearchForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/users/UserForm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/users/UserForm.js
__turbopack_context__.s([
    "default",
    ()=>UserForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.js [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../styles/components/UserForm.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
function UserForm({ user, onSave, onCancel, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles.userCard,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: styles.editForm,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: styles.formRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "First Name:"
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 10,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: user.first_name || '',
                            onChange: (e)=>onChange('first_name', e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 11,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/users/UserForm.js",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: styles.formRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Last Name:"
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: user.last_name || '',
                            onChange: (e)=>onChange('last_name', e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/users/UserForm.js",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: styles.formRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Email:"
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "email",
                            value: user.email || '',
                            onChange: (e)=>onChange('email', e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/users/UserForm.js",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: styles.formRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Phone:"
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: user.phone_number || '',
                            onChange: (e)=>onChange('phone_number', e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/users/UserForm.js",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: styles.formActions,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onSave,
                            variant: "primary",
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onCancel,
                            variant: "secondary",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/users/UserForm.js",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/users/UserForm.js",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/users/UserForm.js",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/users/UserForm.js",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = UserForm;
var _c;
__turbopack_context__.k.register(_c, "UserForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/users/UserCard.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/users/UserCard.js
__turbopack_context__.s([
    "default",
    ()=>UserCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/users/UserForm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/UserService.js [client] (ecmascript)"); // Fixed path
(()=>{
    const e = new Error("Cannot find module '../../../styles/components/UserCard.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function UserCard({ user, isSaved = false, onSave, onUpdate }) {
    _s();
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleEdit = ()=>{
        setEditing(true);
        setEditForm(user);
    };
    const handleSaveEdit = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userService"].updateUser(user.id, editForm);
            setEditing(false);
            setEditForm({});
            onUpdate?.();
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };
    const handleDelete = async ()=>{
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$UserService$2e$js__$5b$client$5d$__$28$ecmascript$29$__["userService"].deleteUser(user.id);
                onUpdate?.();
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error deleting user');
            }
        }
    };
    const handleCancelEdit = ()=>{
        setEditing(false);
        setEditForm({});
    };
    const handleInputChange = (field, value)=>{
        setEditForm((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    if (editing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            user: editForm,
            onSave: handleSaveEdit,
            onCancel: handleCancelEdit,
            onChange: handleInputChange
        }, void 0, false, {
            fileName: "[project]/components/users/UserCard.js",
            lineNumber: 56,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles.userCard,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: styles.userInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: [
                            user.first_name,
                            " ",
                            user.last_name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Username:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 69,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.username
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Email:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 70,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.email
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Phone:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 71,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.phone_number
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Date of Birth:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 72,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.date_of_birth
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "UID:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 73,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.uid
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    user.gender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Gender:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 74,
                                columnNumber: 28
                            }, this),
                            " ",
                            user.gender
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 74,
                        columnNumber: 25
                    }, this),
                    user.nationality && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Nationality:"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 75,
                                columnNumber: 33
                            }, this),
                            " ",
                            user.nationality
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 75,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/users/UserCard.js",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: styles.userActions,
                children: [
                    !isSaved && onSave && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSave(user),
                        className: styles.saveBtn,
                        children: "Save to CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/users/UserCard.js",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    isSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleEdit,
                                className: styles.editBtn,
                                children: "Edit"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDelete,
                                className: styles.deleteBtn,
                                children: "Delete"
                            }, void 0, false, {
                                fileName: "[project]/components/users/UserCard.js",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/users/UserCard.js",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/users/UserCard.js",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(UserCard, "hvdrEU1SR/cl/z8kbOGBgqcI/rI=");
_c = UserCard;
var _c;
__turbopack_context__.k.register(_c, "UserCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/users/UserList.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/users/UserList.js
__turbopack_context__.s([
    "default",
    ()=>UserList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/users/UserCard.js [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../styles/components/UserList.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
function UserList({ users, isSaved = false, onSave, onUpdate }) {
    if (users.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "No users found."
        }, void 0, false, {
            fileName: "[project]/components/users/UserList.js",
            lineNumber: 7,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles.userList,
        children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                isSaved: isSaved,
                onSave: onSave,
                onUpdate: onUpdate
            }, user.uid || user.id, false, {
                fileName: "[project]/components/users/UserList.js",
                lineNumber: 13,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/users/UserList.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = UserList;
var _c;
__turbopack_context__.k.register(_c, "UserList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/users/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// /components/users/index.js
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/users/UserList.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/users/UserCard.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/users/UserForm.js [client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/users/UserList.js [client] (ecmascript) <export default as UserList>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/users/UserList.js [client] (ecmascript)");
}),
"[project]/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*import { useState, useEffect } from 'react';
import UserList from '../components/UserList';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('api');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/users?size=10');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.message || 'Falha ao buscar usuários');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Erro de rede: Não foi possível obter os usuários.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedUsers = async () => {
    try {
      const response = await fetch('/api/records');
      const data = await response.json();
      setSavedUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários salvos:', error);
      setError('Falha ao carregar');
    }
  };

const saveUser = async (user) => {
  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('usuário salvo:', result);
      return result; 
    } else {
      new Error(result.message || 'Não foi possível salvar o  usuário!');
    }
  } catch (error) {
    console.error('Erro ao salvar usuário!:', error);
    throw error; 
  }
};
 
  const saveAllUsers = async () => {
  setLoading(true);
  try {
    let successCount = 0;
    let errorCount = 0;
    
    for (const user of users) {
      try {
        await saveUser(user);
        successCount++;
      } catch (error) {
        console.error(`Falha ao salvar o usuário ${user.first_name}:`, error);
        errorCount++;
      }
    }
    
    alert(`Salvo ${successCount} usuários com sucesso. ${errorCount > 0 ? `${errorCount} falha.` : ''}`);
    fetchSavedUsers(); // Refresh the saved users list
  } catch (error) {
    alert('Erro ao salvar usuários');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsers();
    fetchSavedUsers();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Sistema de gerenciamento de usuários</h1>
        <p>O aplicativo exibe uma lista de usuários obtidos da  API e permite salvar esses dados em um arquivo CSV local. Após o salvamento,
           o usuário pode editar ou excluir registros diretamente do arquivo e podendo adicionar novos usuários ao banco interno a qualquer momento.</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <nav>
          <button 
            className={activeTab === 'api' ? 'active' : ''} 
            onClick={() => setActiveTab('api')}
          >
            Usuários
          </button>
          <button 
            className={activeTab === 'saved' ? 'active' : ''} 
            onClick={() => setActiveTab('saved')}
          >
            Usuários Salvos ({savedUsers.length})
          </button>
          
        </nav>
      </header>

      <main>
        {activeTab === 'api' && (
          <div>
            <div className="controls">
              <button onClick={fetchUsers} disabled={loading}>
                {loading ? 'Carregando...' : 'Buscar novos usuários'}
              </button>
              {users.length > 0 && (
                <button onClick={saveAllUsers} className="save-all">
                  Salvar todos os usuários no CSV
                </button>
              )}
            </div>
            
            {users.length > 0 && (
              <p className="info"> {users.length} usuários</p>
            )}
            
            <UserList 
              users={users} 
              onSave={saveUser}
              onUpdate={fetchSavedUsers}
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <button onClick={fetchSavedUsers} className="refresh">
              Atualizar usuários salvos.
            </button>
            <UserList 
              users={savedUsers} 
              isSaved={true}
              onUpdate={fetchSavedUsers}
            />
          </div>
        )}

      
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        header {
          margin-bottom: 30px;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 20px;
        }
        
        h1 {
          color: #0070f3;
          margin-bottom: 5px;
        }
        
        .error-message {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c00;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .info {
          color: #666;
          font-style: italic;
          margin: 10px 0;
        }
        
        nav {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        nav button {
          padding: 10px 20px;
          border: 1px solid #0070f3;
          background: white;
          color: #0070f3;
          cursor: pointer;
          border-radius: 5px;
        }
        
        nav button.active {
          background: #0070f3;
          color: white;
        }
        
        .controls {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }
        
        button {
          padding: 10px 15px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .save-all {
          background: #28a745;
        }
        
        .refresh {
          background: #ffc107;
          color: black;
          margin-bottom: 20px;
        }
        
        .search-form {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }
        
        .search-form input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}*/ // /pages/index.js
// /pages/index.js
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/hooks/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useUsers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSavedUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useSavedUsers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSearch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useSearch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$TabNav$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/TabNav.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SearchForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/SearchForm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/users/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserList$3e$__ = __turbopack_context__.i("[project]/components/users/UserList.js [client] (ecmascript) <export default as UserList>");
(()=>{
    const e = new Error("Cannot find module '../../styles/pages/index.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../styles/globals.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('api');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { users, loading, error: apiError, fetchUsers, saveUser, saveAllUsers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useUsers"])();
    const { savedUsers, error: savedError, fetchSavedUsers, updateSavedUsers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSavedUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSavedUsers"])();
    const { searchResults, error: searchError, handleSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSearch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSearch"])();
    const error = apiError || savedError || searchError;
    const handleTabChange = (tab)=>{
        setActiveTab(tab);
        if (tab === 'search') {
            setSearchQuery('');
        }
    };
    const handleSearchSubmit = async (e)=>{
        e.preventDefault();
        await handleSearch(searchQuery);
    };
    const tabs = [
        {
            id: 'api',
            label: 'API Users',
            count: null
        },
        {
            id: 'saved',
            label: 'Saved Records',
            count: savedUsers.length
        },
        {
            id: 'search',
            label: 'Search',
            count: null
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "User Management System"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Random Data API Integration"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "error-message",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$TabNav$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TabNav"], {
                        tabs: tabs,
                        activeTab: activeTab,
                        onTabChange: handleTabChange
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    activeTab === 'api' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ApiUsersTab, {
                        users: users,
                        loading: loading,
                        onFetchUsers: fetchUsers,
                        onSaveUser: saveUser,
                        onSaveAllUsers: saveAllUsers,
                        onUpdateSaved: fetchSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this),
                    activeTab === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavedUsersTab, {
                        savedUsers: savedUsers,
                        onRefresh: fetchSavedUsers,
                        onUpdate: updateSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 359,
                        columnNumber: 11
                    }, this),
                    activeTab === 'search' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchTab, {
                        searchQuery: searchQuery,
                        searchResults: searchResults,
                        onSearchChange: setSearchQuery,
                        onSearchSubmit: handleSearchSubmit,
                        onUpdateSaved: updateSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 367,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 346,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
_s(Home, "9702ZCvAR2H9QGNYG3icT+WHTzw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useUsers"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSavedUsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSavedUsers"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useSearch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSearch"]
    ];
});
_c = Home;
// Tab Components
function ApiUsersTab({ users, loading, onFetchUsers, onSaveUser, onSaveAllUsers, onUpdateSaved }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onFetchUsers,
                        disabled: loading,
                        variant: "primary",
                        children: loading ? 'Loading...' : 'Fetch New Users'
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onSaveAllUsers,
                        variant: "success",
                        children: "Save All Users to CSV"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "info",
                children: [
                    "Showing ",
                    users.length,
                    " users from API"
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 403,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserList$3e$__["UserList"], {
                users: users,
                onSave: onSaveUser,
                onUpdate: onUpdateSaved
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 406,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
_c1 = ApiUsersTab;
function SavedUsersTab({ savedUsers, onRefresh, onUpdate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onRefresh,
                variant: "warning",
                children: "Refresh Saved Records"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 418,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserList$3e$__["UserList"], {
                users: savedUsers,
                isSaved: true,
                onUpdate: onUpdate
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 421,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 417,
        columnNumber: 5
    }, this);
}
_c2 = SavedUsersTab;
function SearchTab({ searchQuery, searchResults, onSearchChange, onSearchSubmit, onUpdateSaved }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SearchForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SearchForm"], {
                query: searchQuery,
                onChange: onSearchChange,
                onSubmit: onSearchSubmit,
                placeholder: "Search by first name, last name, or email..."
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "info",
                        children: [
                            "Found ",
                            searchResults.length,
                            " results"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$users$2f$UserList$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserList$3e$__["UserList"], {
                        users: searchResults,
                        isSaved: true,
                        onUpdate: onUpdateSaved
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 443,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 441,
                columnNumber: 9
            }, this),
            searchQuery && searchResults.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No users found matching your search."
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 452,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 432,
        columnNumber: 5
    }, this);
}
_c3 = SearchTab;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Home");
__turbopack_context__.k.register(_c1, "ApiUsersTab");
__turbopack_context__.k.register(_c2, "SavedUsersTab");
__turbopack_context__.k.register(_c3, "SearchTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d2ceb729._.js.map