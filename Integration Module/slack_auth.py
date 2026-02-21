import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

load_dotenv()

SLACK_CLIENT_ID = os.getenv("SLACK_CLIENT_ID")
SLACK_CLIENT_SECRET = os.getenv("SLACK_CLIENT_SECRET")
SLACK_REDIRECT_URI = os.getenv("SLACK_REDIRECT_URI")

def get_slack_auth_url():
    """
    Constructs the Slack authorization URL.
    """
    scopes = "channels:history,groups:history,channels:read,groups:read,users:read"
    return f"https://slack.com/oauth/v2/authorize?client_id={SLACK_CLIENT_ID}&scope={scopes}&redirect_uri={SLACK_REDIRECT_URI}"

def exchange_code_for_token(code: str):
    """
    Exchanges the temporary authorization code for an access token.
    """
    client = WebClient()
    try:
        response = client.oauth_v2_access(
            client_id=SLACK_CLIENT_ID,
            client_secret=SLACK_CLIENT_SECRET,
            code=code,
            redirect_uri=SLACK_REDIRECT_URI
        )
        return response.data
    except SlackApiError as e:
        print(f"Error exchanging code: {e.response['error']}")
        raise e

def get_slack_client(token: str):
    """
    Returns an initialized Slack WebClient.
    """
    return WebClient(token=token)

def get_channel_messages(token: str, channel_id: str):
    """
    Fetches all messages from a specified Slack channel using pagination.
    """
    client = get_slack_client(token)
    messages = []
    try:
        # Initial call
        result = client.conversations_history(channel=channel_id)
        messages.extend(result["messages"])
        
        # Paginate if there are more messages
        while result.get("has_more"):
            cursor = result.get("response_metadata", {}).get("next_cursor")
            if not cursor:
                break
            result = client.conversations_history(channel=channel_id, cursor=cursor)
            messages.extend(result["messages"])
            
        return messages
    except SlackApiError as e:
        print(f"Error fetching messages: {e.response['error']}")
        raise e

def list_channels(token: str):
    """
    Lists public channels in the workspace that the bot has access to.
    """
    client = get_slack_client(token)
    try:
        result = client.conversations_list(types="public_channel,private_channel")
        return result["channels"]
    except SlackApiError as e:
        print(f"Error listing channels: {e.response['error']}")
        raise e

def post_message(token: str, channel_id: str, text: str):
    """
    Sends a message to a Slack channel.
    """
    client = get_slack_client(token)
    try:
        result = client.chat_postMessage(channel=channel_id, text=text)
        return result.data
    except SlackApiError as e:
        print(f"Error posting message: {e.response['error']}")
        raise e

def get_user_info(token: str, user_id: str):
    """
    Fetches user information from Slack.
    """
    client = get_slack_client(token)
    try:
        result = client.users_info(user=user_id)
        return result["user"]
    except SlackApiError as e:
        print(f"Error fetching user info: {e.response['error']}")
        return None
