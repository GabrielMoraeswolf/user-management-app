module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/components/UserList.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
function UserList({ users, isSaved = false, onSave, onUpdate }) {
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [savingId, setSavingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const handleEdit = (user)=>{
        setEditingId(user.id);
        setEditForm({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone_number: user.phone_number || '',
            date_of_birth: user.date_of_birth || ''
        });
    };
    const handleSaveEdit = async (id)=>{
        setSavingId(id);
        try {
            console.log('Saving edit for user ID:', id, 'with data:', editForm);
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });
            const result = await response.json();
            if (response.ok) {
                setEditingId(null);
                setEditForm({});
                onUpdate?.();
                alert('User updated successfully!');
            } else {
                alert(`Error updating user: ${result.message}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user: ' + error.message);
        } finally{
            setSavingId(null);
        }
    };
    const handleDelete = async (id)=>{
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setDeletingId(id);
            try {
                console.log('Deleting user ID:', id);
                const response = await fetch(`/api/records?id=${id}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (response.ok) {
                    onUpdate?.();
                    alert('User deleted successfully!');
                } else {
                    alert(`Error deleting user: ${result.message}`);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error deleting user: ' + error.message);
            } finally{
                setDeletingId(null);
            }
        }
    };
    const handleSaveUser = async (user)=>{
        setSavingId(user.uid);
        try {
            await onSave(user);
        } finally{
            setSavingId(null);
        }
    };
    const handleCancelEdit = ()=>{
        setEditingId(null);
        setEditForm({});
    };
    const handleInputChange = (field, value)=>{
        setEditForm((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    if (users.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "empty-state",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: "📭 No users found"
            }, void 0, false, {
                fileName: "[project]/components/UserList.js",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/UserList.js",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-f2b4b71320552ba3" + " " + "user-list",
        children: [
            users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-f2b4b71320552ba3" + " " + "user-card",
                    children: editingId === user.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-f2b4b71320552ba3" + " " + "edit-form",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: "First Name:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: editForm.first_name || '',
                                        onChange: (e)=>handleInputChange('first_name', e.target.value),
                                        className: "jsx-f2b4b71320552ba3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: "Last Name:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: editForm.last_name || '',
                                        onChange: (e)=>handleInputChange('last_name', e.target.value),
                                        className: "jsx-f2b4b71320552ba3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: "Email:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        value: editForm.email || '',
                                        onChange: (e)=>handleInputChange('email', e.target.value),
                                        className: "jsx-f2b4b71320552ba3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: "Phone:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: editForm.phone_number || '',
                                        onChange: (e)=>handleInputChange('phone_number', e.target.value),
                                        className: "jsx-f2b4b71320552ba3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "form-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSaveEdit(user.id),
                                        className: "jsx-f2b4b71320552ba3",
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: handleCancelEdit,
                                        className: "jsx-f2b4b71320552ba3" + " " + "cancel",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/UserList.js",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "user-info",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            user.first_name,
                                            " ",
                                            user.last_name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "Username:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 156,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            user.username
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "Email:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 157,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            user.email
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "Phone:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 158,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            user.phone_number
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "Date of Birth:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 159,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            user.date_of_birth
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "UID:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 160,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            user.uid
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    user.gender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "Gender:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 161,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            user.gender
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 161,
                                        columnNumber: 33
                                    }, this),
                                    user.nationality && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-f2b4b71320552ba3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f2b4b71320552ba3",
                                                children: "Nationality:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 162,
                                                columnNumber: 41
                                            }, this),
                                            " ",
                                            user.nationality
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 162,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-f2b4b71320552ba3" + " " + "user-actions",
                                children: [
                                    !isSaved && onSave && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSave(user),
                                        className: "jsx-f2b4b71320552ba3" + " " + "save-btn",
                                        children: "Salvar no CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UserList.js",
                                        lineNumber: 167,
                                        columnNumber: 19
                                    }, this),
                                    isSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleEdit(user),
                                                className: "jsx-f2b4b71320552ba3" + " " + "edit-btn",
                                                children: "Editar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 176,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDelete(user.id),
                                                className: "jsx-f2b4b71320552ba3" + " " + "delete-btn",
                                                children: "Deletar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/UserList.js",
                                                lineNumber: 182,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UserList.js",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, user.uid || user.id, false, {
                    fileName: "[project]/components/UserList.js",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "f2b4b71320552ba3",
                children: ".user-list.jsx-f2b4b71320552ba3{gap:20px;display:grid}.user-card.jsx-f2b4b71320552ba3{justify-content:between;border:1px solid #ddd;border-radius:8px;align-items:flex-start;gap:20px;padding:20px;display:flex}.user-info.jsx-f2b4b71320552ba3{flex:1}.user-info.jsx-f2b4b71320552ba3 h3.jsx-f2b4b71320552ba3{color:#333;margin:0 0 10px}.user-info.jsx-f2b4b71320552ba3 p.jsx-f2b4b71320552ba3{color:#666;margin:5px 0}.user-actions.jsx-f2b4b71320552ba3{flex-direction:column;gap:10px;display:flex}.save-btn.jsx-f2b4b71320552ba3{background:#28a745}.edit-btn.jsx-f2b4b71320552ba3{color:#000;background:#ffc107}.delete-btn.jsx-f2b4b71320552ba3{background:#dc3545}.edit-form.jsx-f2b4b71320552ba3{width:100%}.form-row.jsx-f2b4b71320552ba3{align-items:center;margin-bottom:10px;display:flex}.form-row.jsx-f2b4b71320552ba3 label.jsx-f2b4b71320552ba3{width:100px;font-weight:700}.form-row.jsx-f2b4b71320552ba3 input.jsx-f2b4b71320552ba3{border:1px solid #ddd;border-radius:3px;flex:1;padding:5px}.form-actions.jsx-f2b4b71320552ba3{gap:10px;margin-top:15px;display:flex}.cancel.jsx-f2b4b71320552ba3{background:#6c757d}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UserList.js",
        lineNumber: 110,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList.js [ssr] (ecmascript)");
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__a4ff19c3._.js.map