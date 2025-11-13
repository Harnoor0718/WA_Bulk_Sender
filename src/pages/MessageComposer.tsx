import React, { useState } from 'react';
import { Send, Upload, X, Image, FileText, Paperclip, Smile, Copy, Check } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  preview?: string;
}

const MessageComposer: React.FC = () => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯', '🙏', '👏', '😍', '🥰', '😎', '🤔', '👌', '💪'];

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);
    setCharCount(text.length);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      const size = (file.size / 1024).toFixed(2) + ' KB';
      
      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      return {
        id,
        name: file.name,
        size,
        type: file.type,
        preview
      };
    });

    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const insertEmoji = (emoji: string) => {
    setMessage(message + emoji);
    setCharCount(message.length + emoji.length);
    setShowEmojiPicker(false);
  };

  const copyVariable = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVariable(variable);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) {
      alert('Please enter a message or add attachments');
      return;
    }

    // Here you would integrate with WhatsApp API
    alert(`Message sent!\n\nMessage: ${message}\nAttachments: ${attachments.length}`);
    
    // Clear form
    setMessage('');
    setAttachments([]);
    setCharCount(0);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5 text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    return <Paperclip className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Send className="w-7 h-7" />
            Compose Message
          </h2>
          <p className="text-green-50 mt-1">Create your message with text and attachments</p>
        </div>

        {/* Message Composer */}
        <div className="p-6 space-y-6">
          {/* Message Input Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <div className="relative">
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message here... You can use variables like {name}, {phone}"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={6}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  type="button"
                >
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                <span className="text-sm text-gray-500">
                  {charCount} / 1000
                </span>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-14 right-0 bg-white border-2 border-gray-200 rounded-lg shadow-xl p-3 z-10">
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => insertEmoji(emoji)}
                        className="text-2xl hover:bg-gray-100 p-1 rounded transition"
                        type="button"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Variables Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📝 Available Variables:</h3>
            <div className="flex flex-wrap gap-2">
              {['{name}', '{phone}', '{date}', '{time}'].map((variable) => (
                <button
                  key={variable}
                  onClick={() => copyVariable(variable)}
                  className="bg-white px-3 py-1 rounded-full text-sm text-blue-700 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1"
                >
                  {variable}
                  {copiedVariable === variable ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-2">
              Click to copy • These variables will be automatically replaced with actual contact data
            </p>
          </div>

          {/* Attachments Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments (Optional)
            </label>
            
            {/* Upload Button */}
            <label className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition border-2 border-dashed border-gray-300">
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Files</span>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Supported: Images, PDF, Documents (Max 5MB each)
            </p>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-gray-700">
                  Attached Files ({attachments.length})
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      {att.preview ? (
                        <img
                          src={att.preview}
                          alt={att.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          {getFileIcon(att.type)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">
                          {att.name}
                        </p>
                        <p className="text-xs text-gray-500">{att.size}</p>
                      </div>
                      <button
                        onClick={() => removeAttachment(att.id)}
                        className="p-2 hover:bg-red-100 rounded-full transition text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">📱 Message Preview</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm max-w-sm">
              <div className="bg-green-100 rounded-lg p-3 text-sm">
                {message || (
                  <span className="text-gray-400 italic">Your message will appear here...</span>
                )}
              </div>
              {attachments.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  📎 {attachments.length} attachment(s)
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSendMessage}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-5 h-5" />
              Send Test Message
            </button>
            <button
              onClick={() => {
                setMessage('');
                setAttachments([]);
                setCharCount(0);
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
          <li>Use variables to personalize messages for each contact</li>
          <li>Keep messages concise and clear</li>
          <li>Test your message before sending to all contacts</li>
          <li>Attachments will be sent with every message</li>
        </ul>
      </div>
    </div>
  );
};

export default MessageComposer;