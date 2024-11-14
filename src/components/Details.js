// src/TicketDetails.js  
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"; 
import { useNavigate, useParams } from "react-router-dom"; 
import axios from 'axios'; 

const TicketDetails = () => {  
        const user = useSelector((state) => state.auth.login.currentUser);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const navigate = useNavigate();
        const [ticketData, setTicketData] = useState(null);
        const [ticketReplies, setTicketReplies] = useState([]);
        const [isClosed, setIsClosed] = useState(false); // State to track if the ticket is closed
        
        const { ticketId } = useParams(); // Get ticket ID from URL
      
        useEffect(() => {
          if (!user) {
            setLoading(false);
            return;
          }
      
          const fetchTicketData = async () => {
            try {
              const ticketResponse = await axios.get(`http://127.0.0.1:8000/api/support-tickets/${ticketId}`);
              const repliesResponse = await axios.get(`http://127.0.0.1:8000/api/support-tickets/${ticketId}/replies`);
      
              setTicketData(ticketResponse.data);
              setTicketReplies(repliesResponse.data);
              setIsClosed(ticketResponse.data.status === 'Closed'); // Check if the ticket is closed
            } catch (error) {
              console.error("Error fetching ticket data", error);
              setError("Failed to load ticket details.");
            } finally {
              setLoading(false);
            }
          };
      
          fetchTicketData();
        }, [user, ticketId]);
      
        const handleCloseTicket = async (ticketId) => {
          try {
            // Make a PUT request to close the ticket
            const response = await axios.put(`http://127.0.0.1:8000/api/support-tickets/${ticketId}/close`, {
              status: 'Closed',
            });
      
            if (response.status === 200) {
              setTicketData((prevData) => ({
                ...prevData,
                status: 'Closed', // Update the ticket status to closed
              }));
              setIsClosed(true); // Set isClosed to true
            }
          } catch (error) {
            console.error("Error closing ticket:", error);
            setError("Failed to close the ticket.");
          }
        };
      
        if (loading) return <div>Loading...</div>;
        if (error) return <div className="error">{error}</div>;
        if (!user) return <div className="no-access"><h2>Please log in to view ticket details.</h2></div>;
      
        return (
          <div>
            <div className="ticket-details-page">
              <div className="ticket-info">
                <div className="ticket-header">
                  <h3>Ticket Details</h3>
                </div>
      
                {/* Ticket Info */}
                <div className="ticket-details">
                  <div>
                    <label>Requestor</label>
                    {user?.name && <div>{user.name} <span className="owner-badge">Owner</span></div>}
                  </div>
                  <div>
                    <label>Department</label>
                    <div>Technical Support</div>
                  </div>
                  <div>
                    <label>Submitted</label>
                    <div>{new Date(ticketData?.created_at).toLocaleString()}</div>
                  </div>
                  <div>
                    <label>Last Updated</label>
                    <div>{new Date(ticketData?.updated_at).toLocaleString()}</div>
                  </div>
                  <div>
                    <label>Status/Priority</label>
                    <div>
                      <span className={`status-${ticketData?.status.toLowerCase()}`}>{ticketData?.status}</span>
                      <span className={`priority-${ticketData?.priority.toLowerCase()}`}>{ticketData?.priority}</span>
                    </div>
                  </div>
                </div>
      
                {/* Ticket Actions */}
                <div className="ticket-actions">
                  {!isClosed && (
                    <button className="close-button" onClick={() => handleCloseTicket(ticketId)}>Close</button>
                  )}
                  {isClosed && <button className="close-button" disabled>Closed</button>}
                  <button className="reply-button" onClick={() => navigate(`/ticket/${ticketId}/reply`)}>Reply</button>
                </div>
              </div>
      
              {/* Ticket Replies */}
              <div className="ticket-replies">
                <h4>Replies</h4>
                {ticketReplies.length > 0 ? (
                  <ul className="replies">
                    {ticketReplies.map(reply => (
                      <li key={reply.id} className="reply">
                        <div className="reply-header">
                          <div className="reply-author">
                            <div>{reply.author_name}</div>
                            <span className="operator-badge">Operator</span>
                          </div>
                          <span className="reply-date">{new Date(reply.created_at).toLocaleString()}</span>
                        </div>
                        <hr />
                        <h5>{reply.title}</h5>
                        <p>{reply.content}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No replies yet.</p>
                )}
              </div>
      
              {/* Additional Info */}
              <div className="support-links">
                <h4>Support Resources</h4>
                <ul>
                  <li><a href="/ticketlist">Manage Tickets</a></li>
                  <li><a href="#">Notifications</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Resources</a></li>
                  <li><a href="#">Server Status</a></li>
                  <li><a href="#">Create a Ticket</a></li>
                </ul>
              </div>
            </div>
          </div>
        );
    
};  

export default TicketDetails;