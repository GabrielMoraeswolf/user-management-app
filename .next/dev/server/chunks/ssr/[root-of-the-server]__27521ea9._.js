module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/components/UserList/hooks/useUserOperations.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserOperations",
    ()=>useUserOperations
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
function useUserOperations() {
    const [savingId, setSavingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const updateUser = async (id, data)=>{
        setSavingId(id);
        try {
            console.log('Saving edit for user ID:', id, 'with data:', data);
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                alert('User updated successfully!');
                return true;
            } else {
                alert(`Error updating user: ${result.message}`);
                return false;
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user: ' + error.message);
            return false;
        } finally{
            setSavingId(null);
        }
    };
    const deleteUser = async (id)=>{
        setDeletingId(id);
        try {
            console.log('Deleting user ID:', id);
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (response.ok) {
                alert('User deleted successfully!');
                return true;
            } else {
                alert(`Error deleting user: ${result.message}`);
                return false;
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user: ' + error.message);
            return false;
        } finally{
            setDeletingId(null);
        }
    };
    return {
        updateUser,
        deleteUser,
        isSaving: savingId !== null,
        isDeleting: deletingId !== null
    };
}
}),
"[project]/components/UserList/styles/UserList.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cancel": "UserList-module__hS9nJW__cancel",
  "deleteBtn": "UserList-module__hS9nJW__deleteBtn",
  "editBtn": "UserList-module__hS9nJW__editBtn",
  "editForm": "UserList-module__hS9nJW__editForm",
  "emptyState": "UserList-module__hS9nJW__emptyState",
  "formActions": "UserList-module__hS9nJW__formActions",
  "formRow": "UserList-module__hS9nJW__formRow",
  "saveBtn": "UserList-module__hS9nJW__saveBtn",
  "userActions": "UserList-module__hS9nJW__userActions",
  "userCard": "UserList-module__hS9nJW__userCard",
  "userInfo": "UserList-module__hS9nJW__userInfo",
  "userList": "UserList-module__hS9nJW__userList",
});
}),
"[project]/components/UserList/EditForm.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$hooks$2f$useUserOperations$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/hooks/useUserOperations.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/UserList/styles/UserList.module.css [ssr] (css module)");
;
;
;
;
function EditForm({ user, onSave, onCancel }) {
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        date_of_birth: user.date_of_birth || ''
    });
    const { updateUser, isSaving } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$hooks$2f$useUserOperations$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useUserOperations"])();
    const handleInputChange = (field, value)=>{
        setEditForm((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const handleSave = async ()=>{
        const success = await updateUser(user.id, editForm);
        if (success) {
            onSave?.();
            onCancel?.();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editForm,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        children: "First Name:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: editForm.first_name,
                        onChange: (e)=>handleInputChange('first_name', e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/EditForm.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        children: "Last Name:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: editForm.last_name,
                        onChange: (e)=>handleInputChange('last_name', e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/EditForm.js",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        children: "Email:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "email",
                        value: editForm.email,
                        onChange: (e)=>handleInputChange('email', e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/EditForm.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        children: "Phone:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: editForm.phone_number,
                        onChange: (e)=>handleInputChange('phone_number', e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/EditForm.js",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formActions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: isSaving,
                        children: isSaving ? 'Saving...' : 'Save'
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cancel,
                        disabled: isSaving,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/EditForm.js",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UserList/EditForm.js",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/UserList/UserInfo.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserInfo
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/UserList/styles/UserList.module.css [ssr] (css module)");
;
;
function UserInfo({ user }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].userInfo,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                children: [
                    user.first_name,
                    " ",
                    user.last_name
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Username:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 7,
                        columnNumber: 10
                    }, this),
                    " ",
                    user.username
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Email:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 8,
                        columnNumber: 10
                    }, this),
                    " ",
                    user.email
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Phone:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 9,
                        columnNumber: 10
                    }, this),
                    " ",
                    user.phone_number
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Date of Birth:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 10,
                        columnNumber: 10
                    }, this),
                    " ",
                    user.date_of_birth
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "UID:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 11,
                        columnNumber: 10
                    }, this),
                    " ",
                    user.uid
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            user.gender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Gender:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 12,
                        columnNumber: 26
                    }, this),
                    " ",
                    user.gender
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 12,
                columnNumber: 23
            }, this),
            user.nationality && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Nationality:"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserInfo.js",
                        lineNumber: 13,
                        columnNumber: 31
                    }, this),
                    " ",
                    user.nationality
                ]
            }, void 0, true, {
                fileName: "[project]/components/UserList/UserInfo.js",
                lineNumber: 13,
                columnNumber: 28
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UserList/UserInfo.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/UserList/UserActions.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserActions
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$hooks$2f$useUserOperations$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/hooks/useUserOperations.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/UserList/styles/UserList.module.css [ssr] (css module)");
;
;
;
function UserActions({ user, isSaved, onSave, onEdit, onUpdate }) {
    const { deleteUser, isDeleting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$hooks$2f$useUserOperations$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useUserOperations"])();
    const handleDelete = async ()=>{
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            const success = await deleteUser(user.id);
            if (success) {
                onUpdate?.();
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].userActions,
        children: [
            !isSaved && onSave && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>onSave(user),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].saveBtn,
                children: "Salvar no CSV"
            }, void 0, false, {
                fileName: "[project]/components/UserList/UserActions.js",
                lineNumber: 19,
                columnNumber: 9
            }, this),
            isSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onEdit,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editBtn,
                        children: "Editar"
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserActions.js",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handleDelete,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].deleteBtn,
                        disabled: isDeleting,
                        children: isDeleting ? 'Deleting...' : 'Deletar'
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/UserActions.js",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UserList/UserActions.js",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/UserList/UserCard.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$EditForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/EditForm.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$UserInfo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/UserInfo.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$UserActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/UserActions.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/UserList/styles/UserList.module.css [ssr] (css module)");
;
;
;
;
;
function UserCard({ user, isSaved, onSave, onUpdate, isEditing, onEditStart, onEditEnd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].userCard,
        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$EditForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            user: user,
            onSave: onUpdate,
            onCancel: onEditEnd
        }, void 0, false, {
            fileName: "[project]/components/UserList/UserCard.js",
            lineNumber: 18,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$UserInfo$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    user: user
                }, void 0, false, {
                    fileName: "[project]/components/UserList/UserCard.js",
                    lineNumber: 25,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$UserActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    user: user,
                    isSaved: isSaved,
                    onSave: onSave,
                    onEdit: onEditStart,
                    onUpdate: onUpdate
                }, void 0, false, {
                    fileName: "[project]/components/UserList/UserCard.js",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/UserList/UserCard.js",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/UserList/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$UserCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/UserCard.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/UserList/styles/UserList.module.css [ssr] (css module)");
;
;
;
;
function UserList({ users, isSaved = false, onSave, onUpdate }) {
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    if (users.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].emptyState,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: "Nenhum usuário encontrado"
            }, void 0, false, {
                fileName: "[project]/components/UserList/index.js",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/UserList/index.js",
            lineNumber: 10,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].userList,
        children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$UserCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                isSaved: isSaved,
                onSave: onSave,
                onUpdate: onUpdate,
                isEditing: editingId === user.id,
                onEditStart: ()=>setEditingId(user.id),
                onEditEnd: ()=>setEditingId(null)
            }, user.uid || user.id, false, {
                fileName: "[project]/components/UserList/index.js",
                lineNumber: 19,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/UserList/index.js",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/index.js [ssr] (ecmascript)");
;
;
;
;
function Home() {
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [savedUsers, setSavedUsers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('api');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const fetchUsers = async ()=>{
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
        } finally{
            setLoading(false);
        }
    };
    const fetchSavedUsers = async ()=>{
        try {
            const response = await fetch('/api/records');
            const data = await response.json();
            setSavedUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários salvos:', error);
            setError('Falha ao carregar');
        }
    };
    const saveUser = async (user)=>{
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
                    console.error(`Falha ao salvar o usuário ${user.first_name}:`, error);
                    errorCount++;
                }
            }
            alert(`Salvo ${successCount} usuários com sucesso. ${errorCount > 0 ? `${errorCount} falha.` : ''}`);
            fetchSavedUsers(); // Refresh the saved users list
        } catch (error) {
            alert('Erro ao salvar usuários');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchUsers();
        fetchSavedUsers();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-c68d0522acb36222" + " " + "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "jsx-c68d0522acb36222",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "jsx-c68d0522acb36222",
                        children: "Sistema de gerenciamento de usuários"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "jsx-c68d0522acb36222",
                        children: "O aplicativo exibe uma lista de usuários obtidos da  API e permite salvar esses dados em um arquivo CSV local. Após o salvamento, o usuário pode editar ou excluir registros diretamente do arquivo e podendo adicionar novos usuários ao banco interno a qualquer momento."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-c68d0522acb36222" + " " + "error-message",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        className: "jsx-c68d0522acb36222",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('api'),
                                className: "jsx-c68d0522acb36222" + " " + ((activeTab === 'api' ? 'active' : '') || ""),
                                children: "Usuários"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('saved'),
                                className: "jsx-c68d0522acb36222" + " " + ((activeTab === 'saved' ? 'active' : '') || ""),
                                children: [
                                    "Usuários Salvos (",
                                    savedUsers.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "jsx-c68d0522acb36222",
                children: [
                    activeTab === 'api' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-c68d0522acb36222",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-c68d0522acb36222" + " " + "controls",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: fetchUsers,
                                        disabled: loading,
                                        className: "jsx-c68d0522acb36222",
                                        children: loading ? 'Carregando...' : 'Buscar novos usuários'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: saveAllUsers,
                                        className: "jsx-c68d0522acb36222" + " " + "save-all",
                                        children: "Salvar todos os usuários no CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "jsx-c68d0522acb36222" + " " + "info",
                                children: [
                                    " ",
                                    users.length,
                                    " usuários"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                users: users,
                                onSave: saveUser,
                                onUpdate: fetchSavedUsers
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    activeTab === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-c68d0522acb36222",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: fetchSavedUsers,
                                className: "jsx-c68d0522acb36222" + " " + "refresh",
                                children: "Atualizar usuários salvos."
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                users: savedUsers,
                                isSaved: true,
                                onUpdate: fetchSavedUsers
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "c68d0522acb36222",
                children: ".container.jsx-c68d0522acb36222{max-width:1200px;margin:0 auto;padding:20px}header.jsx-c68d0522acb36222{border-bottom:2px solid #0070f3;margin-bottom:30px;padding-bottom:20px}h1.jsx-c68d0522acb36222{color:#0070f3;margin-bottom:5px}.error-message.jsx-c68d0522acb36222{color:#c00;background-color:#fee;border:1px solid #fcc;border-radius:4px;margin:10px 0;padding:10px}.info.jsx-c68d0522acb36222{color:#666;margin:10px 0;font-style:italic}nav.jsx-c68d0522acb36222{gap:10px;margin-top:20px;display:flex}nav.jsx-c68d0522acb36222 button.jsx-c68d0522acb36222{color:#0070f3;cursor:pointer;background:#fff;border:1px solid #0070f3;border-radius:5px;padding:10px 20px}nav.jsx-c68d0522acb36222 button.active.jsx-c68d0522acb36222{color:#fff;background:#0070f3}.controls.jsx-c68d0522acb36222{gap:10px;margin-bottom:20px;display:flex}button.jsx-c68d0522acb36222{color:#fff;cursor:pointer;background:#0070f3;border:none;border-radius:5px;padding:10px 15px}button.jsx-c68d0522acb36222:disabled{cursor:not-allowed;background:#ccc}.save-all.jsx-c68d0522acb36222{background:#28a745}.refresh.jsx-c68d0522acb36222{color:#000;background:#ffc107;margin-bottom:20px}.search-form.jsx-c68d0522acb36222{gap:10px;margin-bottom:20px;display:flex}.search-form.jsx-c68d0522acb36222 input.jsx-c68d0522acb36222{border:1px solid #ddd;border-radius:5px;flex:1;padding:10px}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__27521ea9._.js.map