"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.retrieveConversations = exports.retrieveSingleConversation = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var messageBirdUrl = "https://conversations.messagebird.com/v1";
var MB_ACCESS_KEY = process.env.MB_ACCESS_KEY;
var retrieveConversations = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, jsonData, items, convos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default(messageBirdUrl + "/conversations", {
                    headers: {
                        Authorization: "AccessKey " + MB_ACCESS_KEY,
                    },
                })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result.json()];
            case 2:
                jsonData = _a.sent();
                items = jsonData.items;
                convos = items.map(function (_a) {
                    var updatedDateTime = _a.updatedDatetime, displayName = _a.contact.displayName, id = _a.id;
                    return ({
                        updatedDateTime: updatedDateTime,
                        displayName: displayName,
                        id: id,
                    });
                });
                return [2 /*return*/, convos];
        }
    });
}); };
exports.retrieveConversations = retrieveConversations;
var retrieveSingleConversation = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var singleConvoData, singleConvoJSON, items, messages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default(messageBirdUrl + "/conversations/" + id + "/messages", {
                    headers: {
                        Authorization: "AccessKey " + MB_ACCESS_KEY,
                    },
                })];
            case 1:
                singleConvoData = _a.sent();
                return [4 /*yield*/, singleConvoData.json()];
            case 2:
                singleConvoJSON = _a.sent();
                items = singleConvoJSON.items;
                messages = items.map(function (_a) {
                    var text = _a.content.text, from = _a.from, to = _a.to, id = _a.id, type = _a.type, createdDateTime = _a.createdDatetime, status = _a.status, direction = _a.direction;
                    return ({ text: text, from: from, to: to, id: id, type: type, createdDateTime: createdDateTime, status: status, direction: direction });
                });
                return [2 /*return*/, messages];
        }
    });
}); };
exports.retrieveSingleConversation = retrieveSingleConversation;
var sendMessage = function (id, text) { return __awaiter(void 0, void 0, void 0, function () {
    var body, sendResult, resultJSON;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    content: {
                        text: text,
                    },
                    type: "text",
                };
                return [4 /*yield*/, node_fetch_1.default(messageBirdUrl + "/conversations/" + id + "/messages", {
                        method: "post",
                        headers: {
                            Authorization: "AccessKey " + MB_ACCESS_KEY,
                        },
                        body: JSON.stringify(body),
                    })];
            case 1:
                sendResult = _a.sent();
                return [4 /*yield*/, sendResult.json()];
            case 2:
                resultJSON = _a.sent();
                console.log("Result: ", resultJSON);
                return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
