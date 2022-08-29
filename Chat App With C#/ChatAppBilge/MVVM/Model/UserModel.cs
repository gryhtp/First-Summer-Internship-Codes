using System;
using System.Collections.Generic;
using System.Text;

namespace WpfChatApp.MVVM.Model.View
{
    class UserModel
    {
        public string Users { get; set; }
        public string UID { get; set; }
        public string Username { get; internal set; }
    }
}
