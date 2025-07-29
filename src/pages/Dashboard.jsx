import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, autoSetOffline } from '../redux/slices/membersSlice';

import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';
import StatusChart from '../components/StatusChart';
import LastActiveChart from '../components/LastActiveChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members.list);
  const loadingStatus = useSelector(state => state.members.status);
  const { currentRole, currentUser } = useSelector(state => state.role);

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatch(fetchMembers());
    }
  }, [loadingStatus, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(autoSetOffline());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const userMember = members.find(m => m.name === currentUser);

  return (
    <div className="min-h-screen w-full bg-black text-pink-200 transition-colors duration-300">
      <Header />

      <main className="w-full px-4 py-6 space-y-6">

        {loadingStatus === 'loading' && (
          <div className="text-center text-lg font-medium text-pink-300">
            Loading team members...
          </div>
        )}

        {loadingStatus === 'succeeded' && (
          <>
            {currentRole === 'Team Lead' ? (
              <section className="space-y-8">
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  
                  <div className="lg:col-span-2 bg-black p-6 rounded-2xl shadow-lg">
                    <TaskForm />
                  </div>

                  <div className="lg:col-span-1 bg-black p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[480px]">
                  <h2 className="text-xl font-semibold text-pink-400 mb-4">Team Members</h2>
                    {[...members]
                      .sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive))
                      .map(member => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                  </div>

                </div>
              
                {/* Charts below Taskform */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black p-6 rounded-2xl shadow-lg">
                  <StatusChart />
                  <LastActiveChart />
                </div>

              </section>
            ) : (
              <section className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-black border border-pink-300/20 shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-pink-300 mb-1">
                      Welcome, {currentUser}
                    </h2>
                    <p className="text-sm text-pink-100">
                      Keep your status updated and manage your tasks.
                    </p>
                  </div>

                  <div className="bg-black border border-pink-300/20 shadow-lg rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-pink-300">Update Your Status</h3>
                    <StatusSelector memberId={userMember?.id} />
                  </div>
                </div>

                <div className="bg-black border border-pink-300/20 shadow-lg rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-pink-300">Your Tasks</h3>
                  <TaskList memberId={userMember?.id} />
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
