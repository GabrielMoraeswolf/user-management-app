module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/components/Home/styles/Home.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "Home-module__wMiGxq__button",
  "container": "Home-module__wMiGxq__container",
  "controls": "Home-module__wMiGxq__controls",
  "description": "Home-module__wMiGxq__description",
  "errorMessage": "Home-module__wMiGxq__errorMessage",
  "header": "Home-module__wMiGxq__header",
  "info": "Home-module__wMiGxq__info",
  "nav": "Home-module__wMiGxq__nav",
  "navButton": "Home-module__wMiGxq__navButton",
  "navButtonActive": "Home-module__wMiGxq__navButtonActive",
  "refresh": "Home-module__wMiGxq__refresh",
  "title": "Home-module__wMiGxq__title",
});
}),
"[project]/components/Home/TabNavigation.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TabNavigation
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/Home/styles/Home.module.css [ssr] (css module)");
;
;
function TabNavigation({ activeTab, onTabChange, savedUsersCount }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nav,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navButton} ${activeTab === 'api' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navButtonActive : ''}`,
                onClick: ()=>onTabChange('api'),
                children: "Usuários"
            }, void 0, false, {
                fileName: "[project]/components/Home/TabNavigation.js",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navButton} ${activeTab === 'saved' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navButtonActive : ''}`,
                onClick: ()=>onTabChange('saved'),
                children: [
                    "Usuários Salvos (",
                    savedUsersCount,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/components/Home/TabNavigation.js",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Home/TabNavigation.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Home/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$TabNavigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/TabNavigation.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/Home/styles/Home.module.css [ssr] (css module)");
;
;
;
function Header({ error, activeTab, onTabChange, savedUsersCount }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                children: "Sistema de gerenciamento de usuários"
            }, void 0, false, {
                fileName: "[project]/components/Home/Header.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].description,
                children: "O aplicativo exibe uma lista de usuários obtidos da API e permite salvar esses dados em um arquivo CSV local. Após o salvamento, o usuário pode editar ou excluir registros diretamente do arquivo e podendo adicionar novos usuários ao banco interno a qualquer momento."
            }, void 0, false, {
                fileName: "[project]/components/Home/Header.js",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                children: error
            }, void 0, false, {
                fileName: "[project]/components/Home/Header.js",
                lineNumber: 14,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$TabNavigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                activeTab: activeTab,
                onTabChange: onTabChange,
                savedUsersCount: savedUsersCount
            }, void 0, false, {
                fileName: "[project]/components/Home/Header.js",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Home/Header.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
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
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                return true;
            } else {
                alert(`Erro ao atualizar o usuário: ${result.message}`);
                return false;
            }
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            alert('Erro ao atualizar o usuário: ' + error.message);
            return false;
        } finally{
            setSavingId(null);
        }
    };
    const deleteUser = async (id)=>{
        setDeletingId(id);
        try {
            const response = await fetch(`/api/records?id=${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (response.ok) {
                alert('Usuário excluído com sucesso!');
                return true;
            } else {
                alert(`Erro ao excluir o usuário: ${result.message}`);
                return false;
            }
        } catch (error) {
            console.error('Erro ao excluir o usuário:', error);
            alert('Erro ao excluir o usuário: ' + error.message);
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
                        children: "Primeiro nome:"
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
                        children: "Sobrenome:"
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
                        children: "Telefone:"
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
                        children: isSaving ? 'Salvando...' : 'Salvo'
                    }, void 0, false, {
                        fileName: "[project]/components/UserList/EditForm.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$styles$2f$UserList$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cancel,
                        disabled: isSaving,
                        children: "Cancelar"
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
                        children: "Nome de usuário:"
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
                        children: "Telefone:"
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
                        children: "Data de nascimento:"
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
                        children: "Identificador Único:"
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
                        children: "Gênero:"
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
                        children: "Nacionalidade:"
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
        if (confirm('Tem certeza de que deseja excluir este usuário?')) {
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
                        children: isDeleting ? 'Excluindo...' : 'Excluído'
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
"[project]/components/Home/ApiUsersTab.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ApiUsersTab
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/index.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/Home/styles/Home.module.css [ssr] (css module)");
;
;
;
function ApiUsersTab({ users, loading, onFetchUsers, onSaveUser, onUpdateSavedUsers }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].controls,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].button,
                        onClick: onFetchUsers,
                        disabled: loading,
                        children: loading ? 'Carregando...' : 'Buscar novos usuários'
                    }, void 0, false, {
                        fileName: "[project]/components/Home/ApiUsersTab.js",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    users.length > 0
                ]
            }, void 0, true, {
                fileName: "[project]/components/Home/ApiUsersTab.js",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].info,
                children: [
                    users.length,
                    " usuários"
                ]
            }, void 0, true, {
                fileName: "[project]/components/Home/ApiUsersTab.js",
                lineNumber: 25,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                users: users,
                onSave: onSaveUser,
                onUpdate: onUpdateSavedUsers
            }, void 0, false, {
                fileName: "[project]/components/Home/ApiUsersTab.js",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Home/ApiUsersTab.js",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Home/SavedUsersTab.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SavedUsersTab
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserList/index.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/Home/styles/Home.module.css [ssr] (css module)");
;
;
;
function SavedUsersTab({ savedUsers, onRefresh }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].refresh}`,
                onClick: onRefresh,
                children: "Atualizar usuários salvos."
            }, void 0, false, {
                fileName: "[project]/components/Home/SavedUsersTab.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserList$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                users: savedUsers,
                isSaved: true,
                onUpdate: onRefresh
            }, void 0, false, {
                fileName: "[project]/components/Home/SavedUsersTab.js",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Home/SavedUsersTab.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Home/hooks/useUsers.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUsers",
    ()=>useUsers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
function useUsers() {
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
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
    return {
        users,
        loading,
        error,
        fetchUsers
    };
}
}),
"[project]/components/Home/hooks/useSavedUsers.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSavedUsers",
    ()=>useSavedUsers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
function useSavedUsers() {
    const [savedUsers, setSavedUsers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const fetchSavedUsers = async ()=>{
        try {
            const response = await fetch('/api/records');
            const data = await response.json();
            setSavedUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários salvos:', error);
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
                throw new Error(result.message || 'Não foi possível salvar o usuário!');
            }
        } catch (error) {
            console.error('Erro ao salvar usuário!:', error);
            throw error;
        }
    };
    const saveAllUsers = async (users)=>{
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
            fetchSavedUsers();
        } catch (error) {
            alert('Erro ao salvar usuários');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchSavedUsers();
    }, []);
    return {
        savedUsers,
        fetchSavedUsers,
        saveUser,
        saveAllUsers
    };
}
}),
"[project]/components/Home/hooks/index.js [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$useUsers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/hooks/useUsers.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$useSavedUsers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/hooks/useSavedUsers.js [ssr] (ecmascript)");
;
;
}),
"[project]/components/Home/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/Header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$ApiUsersTab$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/ApiUsersTab.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$SavedUsersTab$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/SavedUsersTab.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/Home/hooks/index.js [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$useUsers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/hooks/useUsers.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$useSavedUsers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/hooks/useSavedUsers.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/Home/styles/Home.module.css [ssr] (css module)");
;
;
;
;
;
;
;
function Home() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('api');
    const { users, loading, error, fetchUsers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$useUsers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useUsers"])();
    const { savedUsers, fetchSavedUsers, saveUser, saveAllUsers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$hooks$2f$useSavedUsers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSavedUsers"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                error: error,
                activeTab: activeTab,
                onTabChange: setActiveTab,
                savedUsersCount: savedUsers.length
            }, void 0, false, {
                fileName: "[project]/components/Home/index.js",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                children: [
                    activeTab === 'api' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$ApiUsersTab$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        users: users,
                        loading: loading,
                        onFetchUsers: fetchUsers,
                        onSaveAllUsers: saveAllUsers,
                        onSaveUser: saveUser,
                        onUpdateSavedUsers: fetchSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/components/Home/index.js",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this),
                    activeTab === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$SavedUsersTab$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        savedUsers: savedUsers,
                        onRefresh: fetchSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/components/Home/index.js",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Home/index.js",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Home/index.js",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Home/index.js [ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Home$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__22048fd7._.js.map